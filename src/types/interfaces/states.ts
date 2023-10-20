import { SportEvent } from './sportEvent';

export interface EventState {
  events: SportEvent[];
  isLightTheme: boolean;
}

export interface RootState {
  events: EventState;
}
