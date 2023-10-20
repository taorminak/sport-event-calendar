import { ActionContext, ActionTree } from 'vuex';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { EventState, RootState } from '@/types/interfaces/states';

const actions: ActionTree<EventState, RootState> = {
  addEvent(context: ActionContext<EventState, RootState>, event: SportEvent) {
    context.commit('addEvent', event);
  },
  deleteEvent(context: ActionContext<EventState, RootState>, eventId: number) {
    const eventIndex = context.state.events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
      context.commit('deleteEvent', eventIndex);
    }
  },
  toggleTheme(context) {
    context.commit('toggleTheme');
  },
};

export default actions;
