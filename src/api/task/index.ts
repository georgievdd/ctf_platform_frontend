import { ITask, ITaskRequest } from "../../interfaces/task";
import endpoints from "../endpoints";
import { instance } from "../instance";

export const taskRow: ITask = {
  title: 'Задание 1',
  description: 'description of this task',
  complexity: 1000,
  id: '1',
  type: 'text',
  body: 'body of this task'
}


export const getAll = (query?: ITaskRequest) =>
  instance.get<ITask[]>(endpoints.TASK.TASK, {params: query});
  // new Promise<ITask[]>(() => [taskRow]);