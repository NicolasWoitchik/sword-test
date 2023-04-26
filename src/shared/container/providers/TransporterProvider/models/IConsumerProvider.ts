import IConsumerPayload from '../dtos/IConsumerPayload';

export default interface IConsumerProvider {
  // new (transporter: ITransporter): IConsumer;
  // constructor(transporter: ITransporter);
  handle(payload: IConsumerPayload): Promise<void>;
}
