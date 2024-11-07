export interface Car {
  name: string;
  color: string;
  id: string;
}

export interface CarMutation {
  name: string;
  color: string;
}

export interface EngineResponse {
  velocity: string;
  distance: string;
}

export interface EngineMutation {
  id: string;
  status: 'started' | 'stopped';
}
