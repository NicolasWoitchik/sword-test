import NotifyManagerService from '@modules/users/services/NotifyManagerService';
import IConsumerPayload from '@shared/container/providers/TransporterProvider/dtos/IConsumerPayload';
import IConsumerProvider from '@shared/container/providers/TransporterProvider/models/IConsumerProvider';
import ITransporterProvider from '@shared/container/providers/TransporterProvider/models/ITransporterProvider';
import TransporterTopics from '@shared/enums/TransporterTopics';
import { container, inject, injectable } from 'tsyringe';

@injectable()
class TechPerformedHandler implements IConsumerProvider {
  constructor(
    @inject('TransporterProvider')
    private transporter: ITransporterProvider
  ) {
    this.handle = this.handle.bind(this);

    this.transporter.subscribe(
      TransporterTopics.USER_NOTIFICATION,
      this.handle
    );
  }

  async handle({ message }: IConsumerPayload): Promise<void> {
    const notifyManagerService = container.resolve(NotifyManagerService);

    await notifyManagerService.execute({
      user_id: message.user_id as number,
      task_id: message.task_id as number,
      performedAt: message.performedAt as Date,
    });
  }
}
export default TechPerformedHandler;
