import type * as React from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';

const DISMISSABLE_OUTSIDE_INTERACTION_SELECTORS = [
  '[data-krit-ui-ignore-dialog-dismiss]',
  '[data-krit-ui-toast]',
  '[data-krit-ui-toast-viewport]',
  '[data-sonner-toast]',
  '[data-sonner-toaster]',
].join(',');

const shouldIgnoreOutsideInteraction = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest(DISMISSABLE_OUTSIDE_INTERACTION_SELECTORS));

type OutsideInteractionEventLike = {
  defaultPrevented: boolean;
  preventDefault: () => void;
  target: EventTarget | null;
  detail?: { originalEvent?: { target?: EventTarget | null } };
};

const getOutsideInteractionTarget = (event: OutsideInteractionEventLike) =>
  event.detail?.originalEvent?.target ?? event.target;

const createOutsideInteractionHandler = <T extends OutsideInteractionEventLike>(
  callback?: (event: T) => void,
) => {
  return (event: T) => {
    callback?.(event);
    if (
      !event.defaultPrevented &&
      shouldIgnoreOutsideInteraction(getOutsideInteractionTarget(event))
    ) {
      event.preventDefault();
    }
  };
};

const createOutsideInteractionHandlers = <
  TPointer extends OutsideInteractionEventLike,
  TInteract extends OutsideInteractionEventLike,
>(options: {
  onPointerDownOutside?: (event: TPointer) => void;
  onInteractOutside?: (event: TInteract) => void;
}) => ({
  onPointerDownOutside: createOutsideInteractionHandler<TPointer>(options.onPointerDownOutside),
  onInteractOutside: createOutsideInteractionHandler<TInteract>(options.onInteractOutside),
});

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const createDialogOutsideInteractionHandlers = (
  options: Pick<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'>,
) =>
  createOutsideInteractionHandlers<
    Parameters<NonNullable<DialogContentProps['onPointerDownOutside']>>[0],
    Parameters<NonNullable<DialogContentProps['onInteractOutside']>>[0]
  >(options);

export { createDialogOutsideInteractionHandlers };
