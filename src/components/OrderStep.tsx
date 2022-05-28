import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { OrderData } from 'src/lib/types';
import Progress from 'src/components/Progress';
import Select from 'src/components/Select';

const flavors = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

const sizes = [
  { label: 'Small', value: 'small' },
  { label: 'Regular', value: 'regular' },
  { label: 'Large', value: 'large' },
];

const schema = z.object({
  flavor: z.enum(['chocolate', 'strawberry', 'vanilla']),
  size: z.enum(['small', 'regular', 'large']),
});

export default function OrderStep() {
  const { register, handleSubmit, formState } = useForm<OrderData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<OrderData> = async (data) => {
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
        <Progress current={2} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <Select
              label="Pick a flavor"
              options={flavors}
              {...register('flavor')}
            />
            <Select
              label="Choose a size"
              options={sizes}
              {...register('size')}
            />
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
