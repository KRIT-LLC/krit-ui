import { FC } from 'react';
import { create } from 'zustand';

export type ConfirmType =
  | 'contrast'
  | 'destructive'
  | 'destructive-primary'
  | 'secondary'
  | 'outline';

export type InputComponent = FC<{ value: string; onChange: (value: string) => void }>;

interface ConfirmState {
  title: string;
  description: string;
  confirmText: string;
  confirmType: ConfirmType;
  confirmHidden: boolean;
  cancelText: string;
  cancelHidden: boolean;

  input?: InputComponent;
  inputValue: string;
  inputPlaceholder: string;
  inputRequiredLabel: string;
  inputMaxLength?: number;
  setInput: (inputValue: string) => void;
  confirmed: boolean | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  show: (options: PromptOptions) => void;
  hide: () => void;
  confirm: (input?: string) => void;
  cancel: () => void;
}

export interface PromptOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  confirmType?: ConfirmType;
  confirmHidden?: boolean;
  cancelText?: string;
  cancelHidden?: boolean;
  input?: InputComponent;
  inputPlaceholder?: string;
  inputRequiredLabel?: string;
  inputMaxLength?: number;
}

export const useConfirmStore = create<ConfirmState>()(set => ({
  title: '',
  description: '',
  confirmText: '',
  confirmType: 'outline' as ConfirmType,
  confirmHidden: false,
  cancelText: '',
  cancelHidden: false,

  inputValue: '',
  inputPlaceholder: '',
  inputRequiredLabel: '',
  setInput: (inputValue: string) => set({ inputValue }),
  confirmed: false,
  visible: false,
  setVisible: (visible: boolean) => set({ visible, confirmed: null }),
  show: (options: PromptOptions) =>
    set({
      visible: true,
      title: options.title ?? '',
      description: options.description,
      confirmText: options.confirmText,
      confirmType: options.confirmType ?? 'secondary',
      confirmHidden: options.confirmHidden ?? false,
      cancelText: options.cancelText ?? '',
      cancelHidden: options.cancelHidden ?? false,
      input: options.input,
      inputPlaceholder: options.inputPlaceholder ?? '',
      inputRequiredLabel: options.inputRequiredLabel ?? '',
      inputMaxLength: options.inputMaxLength,
    }),
  hide: () => set({ visible: false }),
  confirm: inputValue => set({ confirmed: true, visible: false, inputValue }),
  cancel: () => set({ confirmed: false, visible: false }),
}));

export const useConfirm = () => {
  const confirmStore = useConfirmStore();

  const confirm = async (options: PromptOptions) => {
    const { confirmed, unsubscribe } = await new Promise<{
      confirmed: boolean | null;
      unsubscribe: () => void;
    }>(resolve => {
      confirmStore.show(options);
      const unsubscribe = useConfirmStore.subscribe(({ visible, confirmed }) => {
        if (!visible) resolve({ confirmed, unsubscribe });
      });
    });
    unsubscribe();
    return confirmed;
  };

  const prompt = async (options: PromptOptions) => {
    confirmStore.setInput('');
    const { inputValue, unsubscribe } = await new Promise<{
      inputValue: string;
      unsubscribe: () => void;
    }>(resolve => {
      confirmStore.show(options);
      const unsubscribe = useConfirmStore.subscribe(({ visible, inputValue }) => {
        if (!visible) resolve({ inputValue, unsubscribe });
      });
    });
    unsubscribe();
    return inputValue;
  };

  return { confirm, prompt };
};
