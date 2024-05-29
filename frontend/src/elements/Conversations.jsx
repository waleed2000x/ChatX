/* eslint-disable react/prop-types */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSocketContext } from "@/context/socketContext";
import useConversation from "@/zustand/useConversation";
import { useEffect } from "react";

export default function Conversations({ name, avatar, conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  console.log(isOnline);
  useEffect(() => {}, [selectedConversation]);
  return (
    <>
      <div
        className="conversations"
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={isSelected ? "convo selected-convo" : "convo"}>
          <Avatar className="avatar">
            <AvatarImage src={avatar} />
            <div className={isOnline && "online"} />
          </Avatar>
          <p>{name}</p>
          <p>Icon Status</p>
        </div>
      </div>
    </>
  );
}
