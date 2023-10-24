import SportEventsData from '@/data/sportData.json';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { v4 as uuidv4 } from 'uuid';

export function loadEventsFromLocalStorage(this: any) {
  try {
    const savedEvents = localStorage.getItem('events');

    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);

      this.events = this.events.concat(parsedEvents);
    }
  } catch (error) {
    console.error('Error loading events from local storage:', error);
  }
}

export function fetchAndSaveEvents(this: any) {
  const eventsFromJSON = SportEventsData.data.map((eventData) => {
    const resultString = `${eventData.result.homeGoals} : ${eventData.result.awayGoals}`;
    const nameString =
      (eventData.homeTeam ? eventData.homeTeam.officialName : '') +
      ' - ' +
      (eventData.awayTeam ? eventData.awayTeam.officialName : '');

    return {
      id: uuidv4(),
      name: nameString,
      description: eventData.originCompetitionName + ' - ' + eventData.season || '',
      status: eventData.status || '',
      result: resultString || '',
      date: eventData.dateVenue,
      time: eventData.timeVenueUTC,
    };
  });

  this.events = eventsFromJSON;
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

export function sortEventsByTime(events: SportEvent[]) {
  return events.sort(compareEventsByTime);
}

export function sortEventsByDateAndTime(events: SportEvent[]) {
  return events.sort(compareEventsByDate);
}
