import { useAuthContext } from "@/context/authContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser}`,
          },
        });
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        toast(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
