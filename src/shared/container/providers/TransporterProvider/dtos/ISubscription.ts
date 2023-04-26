import IConsumerPayload from './IConsumerPayload';

export default interface ISubscription<T> {
  topic: string;
  consumer: T;
  handle: (payload: IConsumerPayload) => Promise<void>;
}
