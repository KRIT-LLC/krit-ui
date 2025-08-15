import { create } from 'zustand';

interface EventBusState {
  versions: Record<string, number>;
  emit: (topic: string) => void;
}

export const useEventBusStore = create<EventBusState>()(set => ({
  versions: {},
  emit: (topic: string) =>
    set(state => ({
      versions: {
        ...state.versions,
        [topic]: (state.versions[topic] || 0) + 1,
      },
    })),
}));

export const emitEvent = (topic: string) => useEventBusStore.getState().emit(topic);

export const useEventVersion = (topic: string) =>
  useEventBusStore(state => state.versions[topic] || 0);
