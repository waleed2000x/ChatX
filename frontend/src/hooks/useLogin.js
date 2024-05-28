import { useAuthContext } from "@/context/authContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useLogin() {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const login = (username, password) => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/auth/login", { username, password })
      .then((response) => {
        console.log(response.data.message);
        localStorage.setItem("chat-user", JSON.stringify(response.data));
        setAuthUser(response.data);
        toast("🟩 " + response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast("🟥 " + error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { loading, login };
}
