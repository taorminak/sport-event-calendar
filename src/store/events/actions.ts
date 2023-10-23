import { ActionContext, ActionTree } from 'vuex';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { EventState, RootState } from '@/types/interfaces/states';

const actions: ActionTree<EventState, RootState> = {
  addEvent(context: ActionContext<EventState, RootState>, event: SportEvent) {
    context.commit('addEvent', event);
  },
  deleteEvent(context: ActionContext<EventState, RootState>, eventId: number) {},
};

export default actions;
