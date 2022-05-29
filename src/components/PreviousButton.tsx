import { useContext } from 'react'

import { MultiStepFormContext } from 'src/context'

const PreviousButton = () => {
  const multiStepFormService = useContext(MultiStepFormContext)

  const onClick = () => {
    multiStepFormService.send('BACK')
  }

  return (
    <button
      className='inline-flex w-full items-center justify-center rounded-md bg-indigo-500 px-4 py-4 text-sm font-semibold text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400'
      onClick={onClick}
    >
      Back
    </button>
  )
}

export default PreviousButton
