import { Input } from "@/components/ui/input";
import { useThemeContext } from "@/context/theme";
import { Button } from "@/components/ui/button";
import Send from "../assets/icons/send.png";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Messages({ role }) {
  const { theme } = useThemeContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState("");

  const messageSchema = z.string().trim().min(1, "Message cannot be empty");
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      messageSchema.parse(message);
      console.log("Message validated:", message);
    } catch (error) {
      toast("🟥 Message cannot be empty");
      console.error("Message validation error:", error.issues[0].message);
    }
  };

  return (
    <div className="messages-container">
      <Toaster />
      {selectedConversation ? (
        <>
          <div className="messages-header">
            <h3>{selectedConversation.fullname}</h3>
          </div>
          <div className="messages">
            <div className={`message sent ${theme === "L" ? "light" : "dark"}`}>
              <p>Hello how are you?!?!?!?!?!?!</p>
            </div>
            <div
              className={`message received ${theme === "L" ? "light" : "dark"}`}
            >
              <p>Hello how are you?!?!?!?!?!?!</p>
            </div>
          </div>
          <div className="messages-input">
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="secondary" size="icon">
                <img src={Send} alt="Send" />
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <h1>Select a conversation to start chatting</h1>
        </div>
      )}
    </div>
  );
}
