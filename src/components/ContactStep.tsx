import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { ContactData } from 'src/lib/types';
import Progress from 'src/components/Progress';

const telephoneValidation = new RegExp(/^\d([0-9 -]{0,10}\d)?$/);

const schema = z.object({
  name: z.string().min(1, { message: 'Name required' }),
  email: z.string().email('Email required'),
  phone: z.string().regex(telephoneValidation),
});

export default function ContactStep() {
  const { register, handleSubmit, formState } = useForm<ContactData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        alert(JSON.stringify(data));
        resolve();
      }, 1000)
    );
  };

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold">Fancy Form</h2>
      <p className="mt-2 text-lg text-gray-600">This is a really sleek form.</p>
      <div className="mt-8 max-w-md ">
        <Progress current={1} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Full name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder=""
                {...register('name')}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="john@example.com"
                {...register('email')}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone Number</span>
              <input
                type="phone"
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="Enter phone number"
                {...register('phone')}
              />
            </label>
            <div className="py-4">
              <button
                className="inline-flex justify-center items-center px-4 py-4 font-semibold text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed w-full"
                type="submit"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Next'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
