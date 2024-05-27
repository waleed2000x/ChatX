import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Search from "../assets/icons/search.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="searchbar">
        <Input placeholder="Search" />
        <Button>
          <img src={Search} />
        </Button>
      </div>
      <div className="conversations">
        <div className="convo">
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public/boy" />
          </Avatar>
          <p>Name</p>
          <p>Icon Status</p>
        </div>
      </div>
    </div>
  );
}
