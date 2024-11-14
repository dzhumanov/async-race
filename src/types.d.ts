export interface Car {
  name: string;
  color: string;
  id: string;
  velocity?: number;
  status: boolean;
  engine: boolean;
}

export interface CarMutation {
  name: string;
  color: string;
  id?: string;
}

export interface Winner {
  id: string;
  wins: number;
  time: number;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface EngineResponseMutation {
  responseData: EngineResponse;
  id: string;
}

export interface EngineMutation {
  id: string;
  status: 'started' | 'stopped';
}

export interface DrivePayload {
  id: string;
  success: boolean;
}

export interface DriveResult {
  payload: {
    id: string;
    success: boolean;
  };
}
