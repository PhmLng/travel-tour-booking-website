import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'

const signUpSchema = z.object({
  username: z.string().min(1, 'Tên đăng nhập là bắt buộc'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export default function SigninForm({
  className,
  ...props
}) {
    const {register, handleSubmit, formState:{errors, isSubmitting}}     = useForm({
    resolver:zodResolver(signUpSchema)
  })

  const onSubmit = async (data) =>{
    
  }

  return (
    <form
            className="p-6 md:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a
                  href="/"
                  className="mx-auto block w-fit text-center"
                >
                  <img
                    src="/logo.svg"
                    alt="logo"
                  />
                </a>
                <h1 className="text-2xl font-bold">Chào mừng quay lại</h1>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn! Hãy đăng nhập để bắt đầu!
                </p>
              </div>
              {/* username */}
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="username"
                  className="block text-sm"
                >
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="moji"
                 {...register("username")}
                />
                {errors.username && (
                    <p className="text-destructive text-sm">
                      {errors.username.message}
                    </p>
                  )}           
              </div>
           
              {/* password */}
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="password"
                  className="block text-sm"
                >
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                    <p className="text-destructive text-sm">
                      {errors.password.message}
                    </p>
                  )}
              
              </div>

              {/* nút đăng nhập */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                Đăng nhập
              </Button>

              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <a
                  href="/signup"
                  className="underline underline-offset-4"
                >
                  Đăng ký
                </a>
              </div>
            </div>
          </form>
  );
}
