import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export const useAuthActions = () => {
  const [signOut] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    signOut({})
      .unwrap()
      .then(() => router.push("/auth"))
      .catch((err) => console.error("Logout failed:", err));
  };

  return { handleLogout };
};
