import { assign, createMachine } from 'xstate';

export interface MultiStepFormMachineContext {
  beneficiaryInfo?: ContactInfo;
  dateInfo?: DateInfo;
  errorMessage?: string;
}

interface ContactInfo {
  name: string;
  email: string;
  currency: string;
}

interface DateInfo {
  preferredData: string;
}

export type MultiStepFormMachineEvent =
  | {
      type: 'BACK';
    }
  | {
      type: 'CONFIRM_CONTACT';
      info: ContactInfo;
    }
  | {
      type: 'CONFIRM_DATE';
      info: DateInfo;
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
    initial: 'enteringBeneficiary',
    states: {
      enteringBeneficiary: {
        on: {
          CONFIRM_BENEFICIARY: {
            target: 'enteringDate',
            actions: ['assignBeneficiaryInfoToContext'],
          },
        },
      },
      enteringDate: {
        id: 'enteringDate',
        on: {
          BACK: {
            target: 'enteringBeneficiary',
          },
          CONFIRM_DATE: {
            target: 'confirming',
            actions: ['assignDateToContext'],
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
                target: '#enteringDate',
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
      assignDateToContext: assign((context, event) => {
        if (event.type !== 'CONFIRM_DATE') return {};
        return {
          dateInfo: event.info,
        };
      }),
      assignBeneficiaryInfoToContext: assign((context, event) => {
        if (event.type !== 'CONFIRM_BENEFICIARY') return {};
        return {
          beneficiaryInfo: event.info,
        };
      }),
      assignErrorMessageToContext: assign((context, event: any) => {
        return {
          errorMessage: event.data?.message || 'An unknown error occurred',
        };
      }),
      clearErrorMessage: assign({
        errorMessage: undefined,
      }),
    },
  }
);

export default multiStepFormMachine;
