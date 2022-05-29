import { useContext } from 'react'
import { useActor } from '@xstate/react'
import { SubmitHandler } from 'react-hook-form'

import { ContactInfo } from 'src/lib/types'
import Progress from 'src/components/Progress'
import { MultiStepFormContext } from 'src/context'

export default function ContactStep() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const [state] = useActor(multiStepFormService)

  const onClick: SubmitHandler<ContactInfo> = async (data) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2))
        resolve()
      }, 1000),
    )
  }

  return (
    <div className='py-12'>
      <h2 className='text-2xl font-bold'>Fancy Form</h2>
      <p className='mt-2 text-lg text-gray-600'>This is a really sleek form.</p>
      <div className='mt-8 max-w-md'>
        <Progress current={4} />
        <div className='space-y-8'>
          <h2 className='text-xl font-bold'>Summary</h2>
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
        <div>
          <button
            className='inline-flex w-full items-center justify-center rounded-md bg-indigo-500 px-4 py-4 text-sm font-semibold text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400'
            type='submit'
          >
            {formState.isSubmitting ? (
              <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-white' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
