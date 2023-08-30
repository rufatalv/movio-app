"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
function Input({
  id,
  placeholder,
  className,
  register,
  required,
  type,
  htmlFor,
}: {
  id: string;
  placeholder: string;
  className?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  type: string;
  htmlFor: string;
}) {
  return (
    <div className={`relative ${className ? className : "w-full"}`}>
      <input
        id={id}
        {...register(id, { required })}
        placeholder={""}
        className="focus:outline-none peer w-full placeholder:text-[#ABAFB1] placeholder:text-base font-sf outline-none rounded-[8px] h-[58px] px-4 pt-6 border border-[#ABAFB1]"
        type={type}
      />
      <label
        htmlFor={htmlFor}
        className="absolute cursor-text font-sf text-base text-[#ABAFB1] top-1 peer-focus:top-2 peer-focus:left-0 peer-focus:scale-[0.75] transition-all left-4 peer-placeholder-shown:left-4 peer-placeholder-shown:top-4">
        {placeholder}
      </label>
    </div>
  );
}

export default Input;
