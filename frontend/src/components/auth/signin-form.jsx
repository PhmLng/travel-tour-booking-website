import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const signinSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 kí tự"),
  password: z.string().min(6, "PassWord phải có ít nhất 6 kí tự"),
});
export function SigninForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
    const res = await api.post("/auth/login", data);
    console.log(res.data);
    toast.success("Đăng nhập thành công");

    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error("Sai tài khoản hoặc mật khẩu");
  }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-0 overflow-hidden border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header - logo */}
              <div className="flex flex-col items-center gap-2 text-center">
                <a href="/" className="block mx-auto text-center w-fit">
                  <img src="/logo.svg" alt="logo" className="w-10 h-10" />
                </a>
                <h1 className="text-2xl font-bold">Tạo tài khoản Moji</h1>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn! Hãy đăng nhập để bắt đầu!
                </p>
              </div>

              {/* username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="................"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* nút đăng nhập */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Đăng nhập
              </Button>
              <div className="text-sm text-center">Quên mật khẩu? </div>
              <div className="text-sm text-center">
                Chưa có tài khoản?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Đăng ký
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/anh1.svg"
              alt="Image"
              className="absolute object-cover -translate-y-1/2 top-1/2 "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật của chúng tôi</a>.
      </div>
    </div>
  );
}
