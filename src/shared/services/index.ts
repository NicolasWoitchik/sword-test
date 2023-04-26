import registryContainers from '@shared/container';
import createConnection from '@shared/infra/typeorm';
import { container, inject, injectable } from 'tsyringe';
import TechPerformedHandler from '@modules/users/infra/transporter/consumers/TechPerfomedHandler';
import IConsumerProvider from '../container/providers/TransporterProvider/models/IConsumerProvider';
import ITransporterProvider from '../container/providers/TransporterProvider/models/ITransporterProvider';

@injectable()
class Start {
  subscribers: IConsumerProvider[] = [];

  constructor(
    @inject('TransporterProvider')
    private transporterProvider: ITransporterProvider
  ) {}

  async start(): Promise<void> {
    try {
      await createConnection();

      await registryContainers();

      await this.subscribers.push(container.resolve(TechPerformedHandler));

      // container.resolve(TechPerformedHandler);

      await this.transporterProvider.run();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Start;
