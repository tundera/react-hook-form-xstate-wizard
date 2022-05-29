import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { OrderInfo } from 'src/lib/types'
import Progress from 'src/components/Progress'
import PreviousButton from 'src/components/PreviousButton'
import NextButton from 'src/components/NextButton'
import { MultiStepFormContext } from 'src/context'

const flavors = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
]

const sizes = [
  { label: 'Small', value: 'small' },
  { label: 'Regular', value: 'regular' },
  { label: 'Large', value: 'large' },
]

const schema = z.object({
  flavor: z.enum(['chocolate', 'strawberry', 'vanilla']),
  size: z.enum(['small', 'regular', 'large']),
})

export default function OrderStep() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const { register, handleSubmit, formState } = useForm<OrderInfo>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<OrderInfo> = async (data) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        multiStepFormService.send({ type: 'CONFIRM_ORDER', value: data })
        resolve()
      }, 1000),
    )
  }

  return (
    <div className='mt-8'>
      <Progress current={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-6'>
          <label className='block'>
            <span className='text-gray-700'>Pick a flavor</span>
            <select className='mt-1 block w-full' {...register('flavor')}>
              {flavors.map(({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className='block'>
            <span className='text-gray-700'>Choose a size</span>
            <select className='mt-1 block w-full' {...register('size')}>
              {sizes.map(({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className='py-4'>
            <div className='flex justify-between py-4'>
              <PreviousButton />
              <NextButton isLoading={formState.isSubmitting} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
