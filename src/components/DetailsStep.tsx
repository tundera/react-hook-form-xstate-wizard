import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { AdditionalDetails } from 'src/lib/types'
import Progress from 'src/components/Progress'
import PreviousButton from 'src/components/PreviousButton'
import NextButton from 'src/components/NextButton'
import { MultiStepFormContext } from 'src/context'

const schema = z.object({
  details: z.string().max(250, { message: 'Limit additional details to 250 characters' }),
})

export default function DetailsStep() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const { register, handleSubmit, formState } = useForm<AdditionalDetails>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<AdditionalDetails> = async (data) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        multiStepFormService.send({ type: 'CONFIRM_DETAILS', value: data })
        resolve()
      }, 1000),
    )
  }

  return (
    <div className='mt-8 max-w-md'>
      <Progress current={3} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-6'>
          <label className='block'>
            <span className='text-gray-700'>Additional details</span>
            <textarea className='mt-1 block w-full' rows={3} {...register('details')}></textarea>
          </label>
          <div className='flex flex-col justify-between py-4'>
            <PreviousButton />
            <NextButton isLoading={formState.isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  )
}
