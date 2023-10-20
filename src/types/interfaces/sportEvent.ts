export interface SportEvent {
  id: number;
  name: string;
  description?: string;
  status?: boolean;
  result?: string;
  date: Date;
  time: string;
}
