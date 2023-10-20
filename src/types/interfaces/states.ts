import { SportEvent } from './sportEvent';

export interface EventState {
  events: SportEvent[];
}

export interface RootState {
  events: EventState;
}
