import { ITask, ITaskRequest } from "../../interfaces/task";
import endpoints from "../endpoints";
import { instance } from "../instance";

export const taskRaw: ITask = {
  title: 'Приделать замок',
  description: 'Laboris sit aliqua eu mollit nulla culpa et enim. Tempor occaecat amet aliqua aliqua voluptate et quis velit non minim aute qui cillum. Nisi laborum esse tempor minim nisi amet quis ea tempor tempor.',
  complexity: 1000,
  id: '1',
  type: 'file',
  body: 'file.txt'
}

export const tasksRaw: ITask[] = [
  {
    title: 'Задание 1',
    description: 'Описание этого задания',
    complexity: 1000,
    id: '1',
    type: 'text',
    body: 'Тело этого задания'
  },
  {
    title: 'Задание 2',
    description: 'Краткое описание второго задания',
    complexity: 500,
    id: '2',
    type: 'text',
    body: 'Вопросы для второго задания'
  },
  {
    title: 'Задание 3',
    description: 'Детальное описание третьего задания',
    complexity: 1500,
    id: '3',
    type: 'text',
    body: 'Код для третьего задания'
  },
  // Добавляйте дополнительные объекты согласно необходимому формату
];



export const getAll = (query?: ITaskRequest) =>
  instance.get<ITask[]>(endpoints.TASK.TASK, {params: query});
  // new Promise<ITask[]>(() => [taskRaw]);
export const getOne = (id?: ITaskRequest) =>
  instance.get<ITask>(`${endpoints.TASK.TASK}/${id}`);