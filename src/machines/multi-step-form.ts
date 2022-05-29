import { assign, createMachine, ActorRefFrom } from 'xstate'

import { ContactInfo, AdditionalDetails, OrderInfo } from '../lib/types'

export interface MultiStepFormMachineContext {
  contact?: ContactInfo
  order?: OrderInfo
  details?: AdditionalDetails
  errorMessage?: string
}

export type MultiStepFormMachineEvent =
  | {
      type: 'BACK'
    }
  | {
      type: 'CONFIRM_CONTACT'
      value: ContactInfo
    }
  | {
      type: 'CONFIRM_ORDER'
      value: OrderInfo
    }
  | {
      type: 'CONFIRM_DETAILS'
      value: AdditionalDetails
    }
  | {
      type: 'SUBMIT_ORDER'
    }

const multiStepFormMachine = createMachine<MultiStepFormMachineContext, MultiStepFormMachineEvent>(
  {
    id: 'multiStepForm',
    initial: 'contact',
    states: {
      contact: {
        on: {
          CONFIRM_CONTACT: {
            target: 'order',
            actions: assign((_context, event) => {
              if (event.type !== 'CONFIRM_CONTACT') return {}
              return {
                contact: event.value,
              }
            }),
          },
        },
      },
      order: {
        id: 'order',
        on: {
          BACK: {
            target: 'contact',
          },
          CONFIRM_ORDER: {
            target: 'details',
            actions: assign((_context, event) => {
              if (event.type !== 'CONFIRM_ORDER') return {}
              return {
                order: event.value,
              }
            }),
          },
        },
      },
      details: {
        id: 'details',
        on: {
          BACK: {
            target: 'order',
          },
          CONFIRM_DETAILS: {
            target: 'confirming',
            actions: assign((_context, event) => {
              if (event.type !== 'CONFIRM_DETAILS') return {}
              return {
                details: event.value,
              }
            }),
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
              SUBMIT_ORDER: 'submitting',
              BACK: {
                target: '#details',
              },
            },
          },
          submitting: {
            invoke: {
              src: (data) => () => alert(JSON.stringify(data, null, 2)),

              onDone: {
                target: 'complete',
              },
              onError: {
                target: 'idle',
                actions: assign((_context, event: any) => {
                  return {
                    errorMessage: event.data?.message || 'An unknown error occurred',
                  }
                }),
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
    actions: {
      clearErrorMessage: assign((context, event) => {
        return {
          errorMessage: undefined,
        }
      }),
    },
  },
)

export default multiStepFormMachine

export type MultiStepFormService = ActorRefFrom<typeof multiStepFormMachine>
