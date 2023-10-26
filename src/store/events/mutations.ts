import { MutationTree } from 'vuex';
import { EventState } from '@/types/interfaces/states';

const mutations: MutationTree<EventState> = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  UPDATE_EVENTS(state, newEvents) {
    state.events = newEvents;
  },
  UPDATE_EVENT(state, updatedEvent) {
    const index = state.events.findIndex((event) => event.id === updatedEvent.id);

    if (index !== -1) {
      state.events[index] = updatedEvent;
    }
  },
  DELETE_EVENT(state, eventId) {
    const index = state.events.findIndex((event) => event.id === eventId);

    if (index !== -1) {
      state.events.splice(index, 1);
    }
  },
};

export default mutations;
