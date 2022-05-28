import { createContext, ReactNode } from 'react';
import { useInterpret } from '@xstate/react';

import multiStepFormMachine, {
  MultiStepFormService,
} from 'src/machines/multi-step-form';

type GlobalStateContextType = {
  multiStepFormService: MultiStepFormService;
};

export const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const multiStepFormService = useInterpret(multiStepFormMachine);

  return (
    <GlobalStateContext.Provider value={{ multiStepFormService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
