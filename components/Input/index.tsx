import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { cnMerge } from "@/utils/cnMerge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, label, name, placeholder, type, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-y-0.5">
        {label || error ? (
          <div className="flex gap-x-2.5">
            {label ? <label htmlFor={name}>{label}</label> : null}
            {error ? (
              <p className="my-auto text-sm text-danger">{error.message}</p>
            ) : null}
          </div>
        ) : null}
        <input
          className={cnMerge(
            "h-10 rounded-lg border border-primary/60 bg-zinc-50 px-2 py-1 outline-none placeholder:text-zinc-400 focus:border-primary/70 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-200 disabled:opacity-60",
            className,
            {
              "border-danger/80 focus:ring-danger/90": error,
            }
          )}
          placeholder={type === "number" ? "0" : placeholder}
          autoComplete={type === "number" ? "off" : "auto"}
          onKeyDown={
            type === "number"
              ? (event) => {
                  if (
                    ![
                      "Backspace",
                      "Tab",
                      "ArrowUp",
                      "ArrowDown",
                      "ArrowLeft",
                      "ArrowRight",
                    ].includes(event.key) &&
                    !event.key.match(/^\d*\.?\d*$/)
                  ) {
                    event.preventDefault();
                  }
                }
              : undefined
          }
          id={name}
          name={name}
          ref={ref}
          type={type}
          {...props}
        />
      </div>
    );
  }
);
