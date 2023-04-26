import {
  Admin,
  CompressionTypes,
  Consumer,
  EachMessagePayload,
  Kafka,
  KafkaConfig,
  Message,
  Producer,
} from 'kafkajs';

import ISubscription from '../dtos/ISubscription';
import IConsumerPayload from '../dtos/IConsumerPayload';

import ITransporterProvider from '../models/ITransporterProvider';

class KafkaJSProvider implements ITransporterProvider {
  client: Kafka;

  consumers: ISubscription<Consumer>[] = [];

  producer: Producer;

  admin: Admin;

  isConnected = false;

  opts: KafkaConfig;

  constructor(opts?: KafkaConfig) {
    this.opts = {
      clientId: '',
      brokers: [''],
      authenticationTimeout: 10000,
      reauthenticationThreshold: 10000,
      retry: {
        initialRetryTime: 500,
        retries: 10,
      },
      ...opts,
      logLevel: 4,
    };

    this.client = new Kafka(this.opts);

    this.producer = this.client.producer();
    this.admin = this.client.admin();
  }

  async subscribe(
    topic: string,
    handle: (payload: IConsumerPayload) => Promise<void>,
    options: { [x: string]: any }
  ): Promise<void> {
    let groupId = 'group';
    if (options) {
      groupId = options.groupId;
    }

    const consumer = this.client.consumer({
      groupId: `${this.opts.clientId}-${groupId}`,
    });

    await consumer.subscribe({ topic });

    const index = this.consumers.push({
      topic,
      consumer,
      handle,
    });

    if (this.isConnected) {
      this.startConsumer(this.consumers[index - 1]);
    }
  }

  async startConsumer(item: ISubscription<Consumer>): Promise<void> {
    await item.consumer.connect();

    function IsJsonString(str: string) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    await item.consumer.run({
      partitionsConsumedConcurrently: 1,
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        if (!message.value) {
          return;
        }

        let value = message.value.toString();

        if (!IsJsonString(value)) {
          value = Buffer.from(message.value.toString(), 'base64').toString();
        }

        let msg: Record<string, unknown> = {};

        try {
          msg = JSON.parse(value);
        } catch (error) {
          return;
        }

        await item.handle({ topic, message: msg });
      },
    });
  }

  run(): void {
    if (this.isConnected) {
      return;
    }

    this.isConnected = true;

    if (this.consumers.length === 0) {
      return;
    }

    this.consumers.forEach(item => {
      this.startConsumer(item);
    });
  }

  async publish(
    topic: string,
    message: Record<string, unknown>
  ): Promise<void> {
    await this.producer.connect();

    const msg = JSON.stringify(message);

    const payload: Message = {
      value: Buffer.from(msg),
    };

    console.log(payload);

    await this.producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [payload],
    });
  }

  async shutdown(): Promise<void> {
    if (this.admin) await this.admin.disconnect();

    if (this.producer) await this.producer.disconnect();

    if (this.consumers.length > 0) {
      this.consumers.forEach(async item => {
        await item.consumer.disconnect();
      });
    }
  }

  async gracefullShutdown(): Promise<void> {
    const errorTypes = ['unhandledRejection', 'uncaughtException'];
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

    errorTypes.forEach(type => {
      process.on(type, async e => {
        try {
          console.log(`process.on ${type}`);
          console.error(e);
          await this.shutdown();
          process.exit(0);
        } catch (_) {
          process.exit(1);
        }
      });
    });

    signalTraps.forEach((type: any) => {
      process.once(type, async () => {
        try {
          await this.shutdown();
        } finally {
          process.kill(process.pid, type);
        }
      });
    });
  }
}

export default KafkaJSProvider;
