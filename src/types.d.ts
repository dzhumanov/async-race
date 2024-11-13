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
