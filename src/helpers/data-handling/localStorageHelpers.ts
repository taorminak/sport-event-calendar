import { SportEvent } from '@/types/interfaces/sportEvent';

export function updateLocalStorageItem(savedEvents: SportEvent[], index: number, editedEvent: SportEvent): void {
  savedEvents[index] = editedEvent;
  updateLocalStorageItems(savedEvents);
}

export function updateLocalStorageItems(savedEvents: SportEvent[]): void {
  localStorage.setItem('events', JSON.stringify(savedEvents));
}

export function loadEventsFromLocalStorage(): SportEvent[] | null {
  if (localStorage) {
    try {
      const savedEvents = localStorage.getItem('events');

      if (savedEvents) {
        return JSON.parse(savedEvents);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return null;
}

export function deleteEventFromLocalStorage(eventId: string): void {
  try {
    const savedEvents = loadEventsFromLocalStorage() || [];
    const index = savedEvents.findIndex((event: SportEvent) => event.id === eventId);

    if (index !== -1) {
      savedEvents.splice(index, 1);
      updateLocalStorageItems(savedEvents);
    }
  } catch (error: unknown) {
    handleError(error);
  }
}

export function updateLocalStorage(editedEvent: SportEvent): void {
  try {
    const savedEvents = loadEventsFromLocalStorage() || [];
    const index = savedEvents.findIndex((event: SportEvent) => event.id === editedEvent.id);

    if (index !== -1) {
      updateLocalStorageItem(savedEvents, index, editedEvent);
    }
  } catch (error: unknown) {
    handleError(error);
  }
}

export function handleError(error: unknown) {
  console.error(`Error:`, error);
}
