import useConversation from "@/zustand/useConversation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      axios
        .get(`/api/messages/${selectedConversation._id}`)
        .then((response) => {
          setLoading(true);
          setMessages(response?.data);
          //   console.log(response?.data);
        })
        .catch((error) => {
          //   console.log(error);
          toast(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};
export default useGetMessages;
