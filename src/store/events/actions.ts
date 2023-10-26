import { ActionContext, ActionTree } from 'vuex';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { EventState, RootState } from '@/types/interfaces/states';

const actions: ActionTree<EventState, RootState> = {
  addEvent(context: ActionContext<EventState, RootState>, event: SportEvent) {
    context.commit('ADD_EVENT', event);
  },
  updateEvent(context: ActionContext<EventState, RootState>, updatedEvent: SportEvent) {
    context.commit('UPDATE_EVENT', updatedEvent);
  },
  deleteEvent(context: ActionContext<EventState, RootState>, eventId: string) {
    context.commit('DELETE_EVENT', eventId);
  },
};

export default actions;
