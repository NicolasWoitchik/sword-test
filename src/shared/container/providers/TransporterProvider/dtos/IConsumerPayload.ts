export default interface IConsumerPayload {
  topic: string;
  message: Record<string, unknown>;
}
