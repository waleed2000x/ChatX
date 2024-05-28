/* eslint-disable react/prop-types */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useConversation from "@/zustand/useConversation";
import { useEffect } from "react";

export default function Conversations({ name, avatar, conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  console.log(name);
  useEffect(() => {
    console.log(selectedConversation);
  }, [selectedConversation]);
  return (
    <>
      <div
        className="conversations"
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={isSelected ? "convo selected-convo" : "convo"}>
          <Avatar className="avatar">
            <AvatarImage src={avatar} />
            <div className="online" />
          </Avatar>
          <p>{name}</p>
          <p>Icon Status</p>
        </div>
      </div>
    </>
  );
}
