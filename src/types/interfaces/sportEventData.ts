export interface SportEventData {
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: string;
  stadium: string | null;
  homeTeam: {
    name: string;
    officialName: string | null;
    slug: string;
    abbreviation: string;
    teamCountryCode: string;
    stagePosition: string | null;
  };
  awayTeam: {
    name: string;
    officialName: string;
    slug: string;
    abbreviation: string;
    teamCountryCode: string;
    stagePosition: string | null;
  };
  result: {
    homeGoals: number;
    awayGoals: number;
    winner: string | null;
    message: string | null;
    goals: number;
    yellowCards: number;
    secondYellowCards: number;
    directRedCards: number;
  };
  stage: {
    id: string;
    name: string;
    ordering: number;
  };
  group: string | null;
  originCompetitionId: string;
  originCompetitionName: string;
}
