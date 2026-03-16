import { FormField } from '@/types/form';
import { UseFormRegister, Control, Controller } from 'react-hook-form';

interface DynamicFormFieldProps {
  field: FormField;
  register: UseFormRegister<any>;
  control: Control<any>;
  error?: any;
}

export default function DynamicFormField({ field, register, control, error }: DynamicFormFieldProps) {
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(field.id, { required: field.required })}
            placeholder={field.placeholder}
            className={`
              w-full px-4 py-3
              bg-gray-50 dark:bg-zinc-800
              border-2 rounded-lg
              ${error ? 'border-red-500' : 'border-transparent focus:border-lime-500'}
              text-black dark:text-white
              placeholder-gray-400 dark:placeholder-zinc-500
              focus:outline-none
            `}
          />
        );

      case 'textarea':
        return (
          <textarea
            {...register(field.id, { required: field.required })}
            placeholder={field.placeholder}
            rows={4}
            className={`
              w-full px-4 py-3
              bg-gray-50 dark:bg-zinc-800
              border-2 rounded-lg
              ${error ? 'border-red-500' : 'border-transparent focus:border-lime-500'}
              text-black dark:text-white
              placeholder-gray-400 dark:placeholder-zinc-500
              focus:outline-none
              resize-none
            `}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            {...register(field.id, { 
              required: field.required,
              valueAsNumber: true,
              min: field.min,
              max: field.max,
            })}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            className={`
              w-full px-4 py-3
              bg-gray-50 dark:bg-zinc-800
              border-2 rounded-lg
              ${error ? 'border-red-500' : 'border-transparent focus:border-lime-500'}
              text-black dark:text-white
              placeholder-gray-400 dark:placeholder-zinc-500
              focus:outline-none
            `}
          />
        );

      case 'select':
        return (
          <select
            {...register(field.id, { required: field.required })}
            className={`
              w-full px-4 py-3
              bg-gray-50 dark:bg-zinc-800
              border-2 rounded-lg
              ${error ? 'border-red-500' : 'border-transparent focus:border-lime-500'}
              text-black dark:text-white
              focus:outline-none
              cursor-pointer
            `}
          >
            <option value="">Ընտրեք...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <input
                  type="radio"
                  {...register(field.id, { required: field.required })}
                  value={option.value}
                  className="w-4 h-4 text-lime-500 focus:ring-lime-500"
                />
                <span className="text-black dark:text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <input
                  type="checkbox"
                  {...register(field.id)}
                  value={option.value}
                  className="w-4 h-4 text-lime-500 rounded focus:ring-lime-500"
                />
                <span className="text-black dark:text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
            <input
              type="checkbox"
              {...register(field.id)}
              className="w-4 h-4 text-lime-500 rounded focus:ring-lime-500"
            />
            <span className="text-black dark:text-white">{field.label}</span>
          </label>
        );

      case 'date':
        return (
          <input
            type="date"
            {...register(field.id, { required: field.required })}
            className={`
              w-full px-4 py-3
              bg-gray-50 dark:bg-zinc-800
              border-2 rounded-lg
              ${error ? 'border-red-500' : 'border-transparent focus:border-lime-500'}
              text-black dark:text-white
              focus:outline-none
            `}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {field.helpText && (
        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
          {field.helpText}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message || 'Այս դաշտը պարտադիր է'}
        </p>
      )}
    </div>
  );
}
