type ID = string;

export interface IEvent {
  id: ID;
  tasks: string[];
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  comandIds: ID[];
}

export interface IEventResponse {}

export interface IEventRegisterRequest {
  teamId: ID;
  eventId: ID;
}

interface IEventCreate {
  tasks: ID[];
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

interface IEventTaskCheckFlagRequest {
  flag: string;
}

interface IEventTaskCheckFlagResponse {
  verdict: 'OK' | 'WA';
}