import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  label: ReactNode;
  value: string | number | string[];
};

type SelectProps = UseFormRegisterReturn & { label: string; options: Option[] };

const Select = ({ label, options, ...props }: SelectProps) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <select className="block w-full mt-1" {...props}>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  </label>
);

export default Select;
