import useGetMessages from "@/hooks/useGetMessages";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Message({ theme }) {
  const [showTimestamps, setShowTimestamps] = useState({}); // State to track visibility for each message
  const { selectedConversation } = useConversation();
  const { messages, loading } = useGetMessages();

  console.log("messages");
  console.log(messages);
  console.log(selectedConversation);
  console.log("messages");

  // Function to toggle timestamp visibility for a specific message
  const toggleTimestamp = (messageId) => {
    setShowTimestamps((prevTimestamps) => ({
      ...prevTimestamps,
      [messageId]: !prevTimestamps[messageId],
    }));
  };

  return (
    <>
      {loading && (
        <div
          className="messages"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#aaa" }}>loading...</p>
        </div>
      )}
      {loading && messages && messages.length === 0 && (
        <div
          className="messages"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#aaa" }}>
            Send a message to start a conversation!
          </p>
        </div>
      )}
      {!loading && messages.length !== 0 && (
        <div className="messages">
          {messages.map((message) => {
            const fromClient = message.senderId === selectedConversation._id;
            return (
              <div
                key={message._id}
                className={`message ${fromClient ? "sent" : "receive"} ${
                  theme === "L" ? "light" : "dark"
                }`}
                onClick={() => toggleTimestamp(message._id)}
              >
                <p>{message.message}</p>
                {showTimestamps[message._id] && (
                  <sup className="created-at">
                    <b>{new Date(message.createdAt).toLocaleString()}</b>
                  </sup>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
