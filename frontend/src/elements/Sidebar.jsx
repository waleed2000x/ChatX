import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Search from "../assets/icons/search.png";
import { useThemeContext } from "@/context/theme";
import Conversations from "./Conversations";
import LogoutB from "../assets/icons/logoutB.png";
import LogoutW from "../assets/icons/logoutW.png";
import useLogout from "@/hooks/useLogout";
import useGetConversations from "@/hooks/useGetConversation";
import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import { toast } from "sonner";

export default function Sidebar() {
  const { loading, logout } = useLogout();
  const { theme } = useThemeContext();
  const { conversations } = useGetConversations();
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();

  const handleSubmit = () => {
    if (!search) return;
    if (search.length < 3) {
      return toast("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((conversation) =>
      conversation.fullname.toLowerCase().includes(search.toLocaleLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      return toast("Conversation not found");
    }
  };

  return (
    <div className="sidebar">
      <div className="searchbar">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          <img src={Search} />
        </Button>
      </div>
      <div className="conversation-container">
        {conversations &&
          conversations.map((conversation) => {
            return (
              <Conversations
                key={conversation._id}
                name={conversation.fullname}
                avatar={conversation.profilePic}
                conversation={conversation}
              />
            );
          })}
      </div>
      <div className="logout">
        {!loading ? (
          <Button variant="destructive" onClick={logout}>
            {theme === "L" ? (
              <img src={LogoutB} alt="logout" />
            ) : (
              <img src={LogoutW} alt="logout" />
            )}
          </Button>
        ) : (
          <Button variant="destructive">
            {theme === "L" ? (
              <img src={LogoutB} alt="logout" />
            ) : (
              <img src={LogoutW} alt="logout" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
