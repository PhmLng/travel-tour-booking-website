import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("Bạn cần đăng nhập tài khoan để truy cập!");
      setTimeout(() => setRedirect("/signin"), 1500);
    } else if (requiredRole && user.role !== requiredRole) {
      toast.error("Bạn cần đăng nhập tài khoản admin để truy cập trang này!");
      setTimeout(() => setRedirect("/"), 1500);
    }
  }, []);

  if (redirect) return <Navigate to={redirect} />;

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
