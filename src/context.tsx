import { createContext, ReactNode } from 'react'
import { useInterpret } from '@xstate/react'

import multiStepFormMachine, { MultiStepFormService } from 'src/machines/multi-step-form'

type MultiStepFormContextType = MultiStepFormService

export const MultiStepFormContext = createContext({} as MultiStepFormContextType)

export const MultiStepFormProvider = ({ children }: { children: ReactNode }) => {
  const multiStepFormService = useInterpret(multiStepFormMachine)

  return (
    <MultiStepFormContext.Provider value={multiStepFormService}>
      {children}
    </MultiStepFormContext.Provider>
  )
}
