import Messages from "@/elements/Messages";
import Sidebar from "@/elements/Sidebar";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Messages />
    </div>
  );
}
