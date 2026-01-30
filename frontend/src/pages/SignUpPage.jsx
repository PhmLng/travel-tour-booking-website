import React from 'react'
import {useForm} from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { SignupForm } from '@/components/signup-form'

// const signUpSchema = z.object({
//   fullname : z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 kí tự'),
//   email: z.email('Email không hợp lệ'),
//   password : z.string().min(6, "PassWord phải có ít nhất 6 kí tự")
// })

// const onSubmit = async (data) =>{

//   }
export const SignUpPage = () => {
  // const {register, handleSubmit, formState:{errors, isSubmitting}}     = useForm({
  //   resolver:zodResolver(signUpSchema)
  // })
  return (
    //  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="w-full max-w-md p-8 space-y-5 bg-white shadow-lg rounded-xl"
    //   >
    //     <h2 className="text-2xl font-bold text-center text-gray-800">
    //       Đăng ký tài khoản
    //     </h2>

    //     {/* Họ tên */}
    //     <div>
    //       <label className="block mb-1 text-sm font-medium text-gray-700">
    //         Họ tên
    //       </label>
    //       <input
    //         type="text"
    //         placeholder="Nguyễn Văn A"
    //         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //         {...register("fullname")}
    //       />
    //       {errors.fullname && (
    //                 <p className="text-sm text-red-500">
    //                   {errors.fullname.message}
    //                 </p>
    //               )}
    //     </div>

    //     {/* Email */}
    //     <div>
    //       <label className="block mb-1 text-sm font-medium text-gray-700">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         placeholder="email@gmail.com"
    //         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //         {...register("email")}
    //       />
    //       {errors.email && (
    //                 <p className="text-sm text-red-500">
    //                   {errors.email.message}
    //                 </p>
    //               )}
    //     </div>

    //     {/* Mật khẩu */}
    //     <div>
    //       <label className="block mb-1 text-sm font-medium text-gray-700">
    //         Mật khẩu
    //       </label>
    //       <input
    //         type="password"
    //         placeholder="••••••••"
    //         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //         {...register("password")}
    //       />
    //       {errors.password && (
    //                 <p className="text-sm text-red-500">
    //                   {errors.password.message}
    //                 </p>
    //               )}
    //     </div>

    //     {/* Xác nhận mật khẩu */}
    //     <div>
    //       <label className="block mb-1 text-sm font-medium text-gray-700">
    //         Xác nhận mật khẩu
    //       </label>
    //       <input
    //         type="password"
    //         placeholder="••••••••"
    //         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //       />
    //     </div>

    //     {/* Button */}
    //     <button
    //       type="submit"
    //       className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
    //       disabled={isSubmitting}
    //     >
    //       Đăng ký
    //     </button>

    //     {/* Link */}
    //     <p className="text-sm text-center text-gray-600">
    //       Đã có tài khoản?{" "}
    //       <a href="#" className="text-blue-600 hover:underline">
    //         Đăng nhập
    //       </a>
    //     </p>
    //   </form>
    // </div>
   <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 bg-muted min-h-svh md:p-10 bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm/>
      </div>
    </div>
  
    
  )
}
