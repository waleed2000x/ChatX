import { useAuthContext } from "@/context/authContext";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogout = () => {
  const { setSelectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

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
      setSelectedConversation(null);
      setAuthUser(null);
      toast("🟩 Logged Out Successfully!");
      navigate("/"); // Navigate to home page after successful logout
    } catch (error) {
      toast(`🟥 Error: ${error.message}`);
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
