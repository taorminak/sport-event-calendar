import SportEventsData from '@/data/sportData.json';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { v4 as uuidv4 } from 'uuid';

export function fetchAndSaveEvents(): SportEvent[] {
  const eventsFromJSON = SportEventsData.data.map((eventData) => {
    const resultString = `${eventData.result.homeGoals} : ${eventData.result.awayGoals}`;
    const nameString =
      (eventData.homeTeam ? eventData.homeTeam.officialName : 'Unknown') +
      ' - ' +
      (eventData.awayTeam ? eventData.awayTeam.officialName : 'Unknown');
    const descriptionString = eventData.originCompetitionName + ' - ' + eventData.season;
    const [hours, minutes] = eventData.timeVenueUTC.split(':').slice(0, 2);
    const timeString = `${hours}:${minutes}`;

    return {
      id: uuidv4(),
      name: nameString,
      description: descriptionString || 'Unknown',
      status: eventData.status || 'Unknown',
      result: resultString || 'Unknown',
      date: eventData.dateVenue || 'Unknown',
      time: timeString || 'Unknown',
    };
  });

  return eventsFromJSON;
}

function getTimeDifference(timeA: string, timeB: string): number {
  const [hoursA, minutesA] = timeA.split(':').map(Number);
  const [hoursB, minutesB] = timeB.split(':').map(Number);

  if (hoursA === hoursB) {
    return minutesA - minutesB;
  }

  return hoursA - hoursB;
}

function compareEventsByTime(a: SportEvent, b: SportEvent): number {
  return getTimeDifference(a.time, b.time);
}

function compareEventsByDate(a: SportEvent, b: SportEvent): number {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA.getTime() !== dateB.getTime()) {
    return dateA.getTime() - dateB.getTime();
  }

  return compareEventsByTime(a, b);
}

export function sortEventsByTime(events: SportEvent[]): SportEvent[] {
  return events.sort(compareEventsByTime);
}

export function sortEventsByDateAndTime(events: SportEvent[]): SportEvent[] {
  return events.sort(compareEventsByDate);
}
