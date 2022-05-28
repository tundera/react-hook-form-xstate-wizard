import { assign, createMachine } from 'xstate';

import { ContactData, AdditionalDetailsData, OrderData } from '../lib/types';

export interface MultiStepFormMachineContext {
  contactData?: ContactData;
  orderData?: OrderData;
  detailsData?: AdditionalDetailsData;
  errorMessage?: string;
}

export type MultiStepFormMachineEvent =
  | {
      type: 'BACK';
    }
  | {
      type: 'CONFIRM_CONTACT';
      info: ContactData;
    }
  | {
      type: 'CONFIRM_ORDER';
      info: OrderData;
    }
  | {
      type: 'CONFIRM_DETAILS';
      info: AdditionalDetailsData;
    }
  | {
      type: 'CONFIRM';
    };

const multiStepFormMachine = createMachine<
  MultiStepFormMachineContext,
  MultiStepFormMachineEvent
>(
  {
    id: 'multiStepForm',
    initial: 'enteringContact',
    states: {
      enteringContact: {
        on: {
          CONFIRM_CONTACT: {
            target: 'enteringOrder',
            actions: ['assignContactDataToContext'],
          },
        },
      },
      enteringOrder: {
        id: 'enteringOrder',
        on: {
          BACK: {
            target: 'enteringContact',
          },
          CONFIRM_ORDER: {
            target: 'enteringDetails',
            actions: ['assignOrderDataToContext'],
          },
        },
      },
      enteringDetails: {
        id: 'enteringDetails',
        on: {
          BACK: {
            target: 'enteringOrder',
          },
          CONFIRM_DETAILS: {
            target: 'confirming',
            actions: ['assignDetailsDataToContext'],
          },
        },
      },
      confirming: {
        onDone: {
          target: 'success',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CONFIRM: 'submitting',
              BACK: {
                target: '#enteringDetails',
              },
            },
          },
          submitting: {
            invoke: {
              src: 'submitPayment',
              onDone: {
                target: 'complete',
              },
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
          },
          complete: { type: 'final' },
        },
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    services: { submitPayment: () => () => {} },
    actions: {
      assignContactDataToContext: assign((context, event) => {
        if (event.type !== 'CONFIRM_CONTACT') return {};
        return {
          contactData: event.info,
        };
      }),
      assignOrderDataToContext: assign((context, event) => {
        if (event.type !== 'CONFIRM_ORDER') return {};
        return {
          orderData: event.info,
        };
      }),
      assignDetailsDataToContext: assign((context, event) => {
        if (event.type !== 'CONFIRM_DETAILS') return {};
        return {
          detailsData: event.info,
        };
      }),
      assignErrorMessageToContext: assign((context, event: any) => {
        return {
          errorMessage: event.data?.message || 'An unknown error occurred',
        };
      }),
      clearErrorMessage: assign((context, event) => {
        return {
          errorMessage: undefined,
        };
      }),
    },
  }
);

export default multiStepFormMachine;