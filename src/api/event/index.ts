import { IEvent, IEventRegisterRequest, IEventResponse } from "../../interfaces/event";
import endpoints from "../endpoints";
import { instance } from "../instance";
import { taskRaw } from "../task";

export const eventRaw: IEvent = {
  id: '12',
  tasks: Array(4).fill(taskRaw),
  startTime: '2023-12-03T01:06:00.076Z',
  endTime: '2023-12-03T03:06:00.076Z',
  title: 'Соревнование 1',
  description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum del',
  comandIds: ["1", "2", "3"],
}

export const eventsRaw: IEvent[] = Array(4).fill(eventRaw);


export const getAll = (data?: IEventResponse) =>
  instance.post<IEvent[]>(endpoints.EVENT.EVENT);

export const registration = ({eventId, teamId}: IEventRegisterRequest) => 
  instance.post(endpoints.EVENT.REGISTRATION(eventId, teamId));
