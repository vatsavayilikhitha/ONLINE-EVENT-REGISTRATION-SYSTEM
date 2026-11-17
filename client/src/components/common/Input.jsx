import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      id,
      name,
      type = 'text',
      placeholder = '',
      value,
      onChange,
      error,
      helperText,
      required = false,
      disabled = false,
      icon: Icon,
      className = '',
      inputClassName = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-charcoal dark:text-[#F8F7F3] mb-1.5"
          >
            {label}
            {required && <span className="text-warm-red ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-xl shadow-xs">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-warm-gray dark:text-[#A8A29E]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            className={`block w-full rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 caret-coral ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 py-2.5 ${
              error
                ? 'border-warm-red text-warm-red placeholder-warm-red/40 focus:border-warm-red focus:ring-warm-red/20'
                : 'border-warm-border dark:border-[#2E2E2E] text-charcoal dark:text-[#F8F7F3] placeholder-warm-gray/50 dark:placeholder-[#6B6B67] hover:border-stone-400 dark:hover:border-[#4A4A4A] focus:border-coral dark:focus:border-coral focus:ring-coral/20 dark:focus:ring-coral/30'
            } ${disabled ? 'bg-stone-100 dark:bg-[#252525] cursor-not-allowed text-warm-gray dark:text-[#A8A29E]' : 'bg-white dark:bg-[#1C1C1C]'} ${inputClassName}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-warm-red font-medium">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-warm-gray dark:text-[#A8A29E]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
