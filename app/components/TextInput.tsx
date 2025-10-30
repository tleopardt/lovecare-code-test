import React, { forwardRef, ReactNode } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean;
    containerClass?: string;
    inputClass?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ leftIcon, rightIcon, disabled, containerClass, inputClass, ...inputProps }, ref) => {

    return (
      <div className={`w-full h-[45px] !px-[16px] rounded-full border-1 border-[var(--colors-gray-100)] flex-between bg-[var(--background)] ${containerClass}`}>
          <div className="flex-1 flex items-center gap-3">
            {leftIcon}

            <input
              ref={ref}
              className={`flex-1 font-[16px] bg-[var(--background)] ${inputClass}`} 
              disabled={disabled} 
              {...inputProps} />
          </div>

          {rightIcon}
      </div>
    )
  }
)

export default TextInput