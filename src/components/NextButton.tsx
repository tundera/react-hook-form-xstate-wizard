type NextButtonProps = {
  isLoading: boolean
}

const NextButton = ({ isLoading = false }: NextButtonProps) => {
  return (
    <button
      className='inline-flex w-40 items-center justify-center rounded-md bg-indigo-500 px-4 py-4 text-sm font-semibold text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400'
      type='submit'
    >
      {isLoading ? (
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
  )
}

export default NextButton
