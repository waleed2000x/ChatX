import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { toast } from "sonner";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast("🟩 Logged Out Successfully!");
    } catch (error) {
      toast(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
