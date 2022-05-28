import { useContext } from 'react';
import { useSelector, useActor } from '@xstate/react';

import ContactStep from 'src/components/ContactStep';
import OrderStep from 'src/components/OrderStep';
import DetailsStep from 'src/components/DetailsStep';
import { GlobalStateContext } from 'src/context';

export default function MultiStepForm() {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.multiStepFormService);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        {state.matches('enteringContact') && <ContactStep />}
        {state.matches('enteringOrder') && <OrderStep />}
        {state.matches('enteringDetails') && <DetailsStep />}
      </div>
    </>
  );
}
