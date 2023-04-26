export default interface IUpdateTaskDTO {
  name: string;
  summary: string;
  user_id: number;
  task_id: number;
  finished?: boolean;
}
