import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useGetConversations from "@/hooks/useGetConversation";

export default function Conversations({ gender, theme }) {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);
  return (
    <>
      <div className="conversations">
        <div className="convo">
          <Avatar className="avatar">
            <AvatarImage
              src={`https://avatar.iran.liara.run/public/${gender}`}
            />
            <div className="online" />
          </Avatar>
          <p>Name</p>
          <p>Icon Status</p>
        </div>
      </div>
      {/* <div
        style={{
          backgroundColor: theme === "L" ? "black" : "#aaa",
          height: "0.5px",
          width: "95%",
          //   margin: "3px 0px",
        }}
      /> */}
    </>
  );
}
