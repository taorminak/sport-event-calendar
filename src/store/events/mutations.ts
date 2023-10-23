import { MutationTree } from 'vuex';
import { EventState } from '@/types/interfaces/states';
import { SportEvent } from '@/types/interfaces/sportEvent';

const mutations: MutationTree<EventState> = {
  addEvent(state, event) {
    state.events.push(event);
    console.log(state.events);
    saveEventToLocalStorage(state.events);
  },
};

export default mutations;

function saveEventToLocalStorage(events: SportEvent[]) {
  try {
    // Get existing events from local storage
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = [...existingEvents, ...events];

    localStorage.setItem('events', JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('Error saving events to local storage:', error);
  }
}
