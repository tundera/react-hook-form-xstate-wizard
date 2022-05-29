import { useContext } from 'react'
import { useActor } from '@xstate/react'

import ContactStep from 'src/components/ContactStep'
import OrderStep from 'src/components/OrderStep'
import DetailsStep from 'src/components/DetailsStep'
import Confirmation from 'src/components/Confirmation'
import { MultiStepFormContext } from 'src/context'

export default function MultiStepForm() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const [state] = useActor(multiStepFormService)

  return (
    <div className='flex w-full flex-col items-stretch'>
      <div className='py-12'>
        <h2 className='text-2xl font-bold'>Fancy Form</h2>
        <p className='mt-2 text-lg text-gray-600'>This is a really sleek form.</p>
        {state.matches('contact') && <ContactStep />}
        {state.matches('order') && <OrderStep />}
        {state.matches('details') && <DetailsStep />}
        {state.matches('confirming') && <Confirmation />}
      </div>
      <div className='w-full py-2'>
        <pre>
          <code>{JSON.stringify(state.context, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
