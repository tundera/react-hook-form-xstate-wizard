import { useContext } from 'react'
import { useActor } from '@xstate/react'

import Progress from 'src/components/Progress'
import { MultiStepFormContext } from 'src/context'

export default function Confirmation() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const [state] = useActor(multiStepFormService)

  const onClick = async () => {
    multiStepFormService.send({ type: 'SUBMIT_ORDER' })
  }

  return (
    <div className='mt-8'>
      <Progress current={4} />
      <div className='space-y-8'>
        <p className='text-gray-600'>Please review your order before submitting.</p>
        <div className='space-y-4'>
          <div className='flex items-start'>
            <p className='text-lg italic text-gray-600'>Contact Details</p>
            <p className='text-black'>{`Name: ${state.context.contact?.name}`}</p>
            <p className='text-black'>{`Email: ${state.context.contact?.email}`}</p>
            <p className='text-black'>{`Phone: ${state.context.contact?.phone}`}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-start'>
            <p className='text-lg italic text-gray-600'>Order Details</p>
            <p className='text-black'>{`Flavor: ${state.context.order?.flavor}`}</p>
            <p className='text-black'>{`Size: ${state.context.order?.size}`}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-start'>
            <p className='text-lg italic text-gray-600'>Additional Details</p>
            <p className='text-black'>{`Details: ${state.context.details?.details}`}</p>
          </div>
        </div>
      </div>
      <div className='py-4'>
        <button
          className='inline-flex w-40 items-center justify-center rounded-md bg-indigo-500 px-4 py-4 text-sm font-semibold text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400'
          onClick={onClick}
        >
          {state.matches('success') ? 'Done' : 'Submit Order'}
        </button>
      </div>
    </div>
  )
}
