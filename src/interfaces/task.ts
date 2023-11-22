export interface ITaskBody {
  status: 'archive' | 'run' | 'new';
  type: 'image' | 'text' | 'file';
  body: string;
  description: string;
  title: string;
  complexity: number;
}

export interface ITask extends ITaskBody {
  id: string;
}

export interface ITaskCreate {
  type: 'image' | 'text' | 'file';
  body: string;
  description: string;
  title: string;
  complexity: number;
}

export interface ITaskCheckFlagRequest {
  flag: string;
}

export interface ITaskCheckFlagResponse {
  verdict: 'OK' | 'WA';
}