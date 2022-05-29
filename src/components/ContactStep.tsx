import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { ContactInfo } from 'src/lib/types'
import Progress from 'src/components/Progress'
import PreviousButton from 'src/components/PreviousButton'
import NextButton from 'src/components/NextButton'
import { MultiStepFormContext } from 'src/context'

const telephoneValidation = new RegExp(/^\d([0-9 -]{0,10}\d)?$/)

const schema = z.object({
  name: z.string().min(1, { message: 'Name required' }),
  email: z.string().email('Email required'),
  phone: z.string().regex(telephoneValidation),
})

export default function ContactStep() {
  const multiStepFormService = useContext(MultiStepFormContext)
  const { register, handleSubmit, formState } = useForm<ContactInfo>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<ContactInfo> = async (data) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        multiStepFormService.send({ type: 'CONFIRM_CONTACT', value: data })
        resolve()
      }, 1000),
    )
  }

  return (
    <div className='mt-8 max-w-md'>
      <Progress current={1} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-6'>
          <label className='block'>
            <span className='text-gray-700'>Full name</span>
            <input
              type='text'
              className='mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0'
              placeholder=''
              {...register('name')}
            />
          </label>
          <label className='block'>
            <span className='text-gray-700'>Email address</span>
            <input
              type='email'
              className='mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0'
              placeholder='john@example.com'
              {...register('email')}
            />
          </label>
          <label className='block'>
            <span className='text-gray-700'>Phone Number</span>
            <input
              type='phone'
              className='mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0'
              placeholder='Enter phone number'
              {...register('phone')}
            />
          </label>
          <div className='py-4'>
            <div className='flex flex-col justify-between py-4'>
              <PreviousButton />
              <NextButton isLoading={formState.isSubmitting} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
