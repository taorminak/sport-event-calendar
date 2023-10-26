import { MutationTree } from 'vuex';
import { EventState } from '@/types/interfaces/states';

const mutations: MutationTree<EventState> = {
  ADD_EVENT(state, event) {
    state.events.push(event);
    console.log(state.events);
  },
  updateEvents(state, newEvents) {
    state.events = newEvents;
    console.log(state.events);
  },
  UPDATE_EVENT(state, updatedEvent) {
    const index = state.events.findIndex((event) => event.id === updatedEvent.id);

    if (index !== -1) {
      state.events[index] = updatedEvent;
    }
    console.log(state.events);
  },
  DELETE_EVENT(state, eventId) {
    const index = state.events.findIndex((event) => event.id === eventId);

    if (index !== -1) {
      state.events.splice(index, 1);
    }
    console.log(state.events);
  },
};

export default mutations;
