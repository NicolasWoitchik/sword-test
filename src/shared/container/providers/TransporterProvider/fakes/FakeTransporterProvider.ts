import { Logger } from 'tslog';

import ITransporterProvider from '../models/ITransporterProvider';
import ISubscription from '../dtos/ISubscription';

class FakeTransporterProvider implements ITransporterProvider {
  client: any[];

  consumers: ISubscription<Record<string, unknown>>[];

  logger = new Logger({
    prefix: ['[TRASNPORTER][Fake]'],
  });

  public async subscribe(
    topic: string,
    handle: (payload: any) => Promise<any>,
    options?: any
  ): Promise<void> {
    this.client.push({
      value: JSON.stringify({
        priority:
          options.defaultJobOptions && options.defaultJobOptions.priority,
      }),
    });
    this.consumers.push({
      consumer: {
        example: 'test',
      },
      handle,
      topic,
    });
  }

  public async publish(topic: string, message: any): Promise<void> {
    this.logger.info(`Message ${message}`);
    this.logger.info(`Message to topic '${topic}' produced successfully`);
  }

  startConsumer(subscription: ISubscription<Record<string, unknown>>): void {
    this.logger.info(`Consumer connected to topic '${subscription.topic}'`);
    this.logger.info('Enviando um job de teste');
  }

  run(): void {
    this.logger.debug('Starting consumers');
  }

  public async shutdown(): Promise<void> {
    this.logger.info(`Disconnecting to consumer`);
  }

  public async gracefullShutdown(): Promise<void> {
    this.logger.info(`Gracefull Shutdown`);
  }
}

export default FakeTransporterProvider;
