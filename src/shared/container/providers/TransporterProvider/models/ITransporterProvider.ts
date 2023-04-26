import IConsumerPayload from '../dtos/IConsumerPayload';

export default interface ITransporterProvider {
  subscribe(
    topic: string,
    handle: (payload: IConsumerPayload) => Promise<unknown>,
    options?: unknown
  ): Promise<void>;
  publish(
    topic: string,
    message: Record<string, unknown> | string | unknown
  ): Promise<void>;
  run(): void;
}
