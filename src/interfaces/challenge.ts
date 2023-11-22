export interface IChallenge {
  id: string;
  tasks: string[];
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  comands: IChallengeTeam;
}

interface IChallengeTeam {
  id: string;
  solvedTaskIds: string[];
  rating: number;
}

interface IChallengeCreate {
  tasks: string[];
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

interface IChalengeTaskCheckFlagRequest {
  flag: string;
}

interface IChalengeTaskCheckFlagResponse {
  verdict: 'OK' | 'WA';
}