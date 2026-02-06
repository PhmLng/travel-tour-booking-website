import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ContactSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  orderCode: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
  message: z.string().min(10, "Lời nhắn phải ít nhất 10 ký tự"),
});

const InputField = ({
  label,
  placeholder,
  type = "text",
  error,
  ...register
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="font-medium text-gray-500">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="border-b outline-none border-b-gray-500 placeholder:text-gray-400 focus:border-blue-400"
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

const FormField = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ContactSchema) });
  const onSubmit = (data) => {
    console.log("Form data:", data);
  };
  return (
    <form
      action=""
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <InputField
          label="Họ và tên"
          placeholder="Nguyễn Văn c"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <InputField
          label="Mã đơn nếu có"
          placeholder="KJSDKVB099"
          {...register("orderCode")}
          error={errors.orderCode?.message}
        />
      </div>
      <InputField
        label="email"
        placeholder="abckd@gmail.com"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-500">Tin nhắn</label>
        <textarea
          rows={5}
          className="border-b outline-none border-b-gray-500 placeholder:text-gray-400 focus:border-blue-400"
          {...register("message")}
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-6 bg-linear-to-r from-slate-800 to-slate-900 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all"
      >
        Gửi
      </button>
    </form>
  );
};

export const FromContact = () => {
  return (
    <div className="w-full max-w-3xl p-10 shadow-xl rounded-2xl bg-linear-to-br from-white/90 via-cyan-50/80 to-green-100/80 backdrop-blur-md">
      <h2 className="mb-10 text-4xl font-bold text-center text-slate-700">
        Liên hệ với chúng tôi
      </h2>
      <FormField />
    </div>
  );
};
