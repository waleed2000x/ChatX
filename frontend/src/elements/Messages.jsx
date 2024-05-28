import { Input } from "@/components/ui/input";
import { useThemeContext } from "@/context/theme";
import { Button } from "@/components/ui/button";
import Send from "../assets/icons/send.png";
export default function Messages({ role }) {
  const { theme } = useThemeContext();
  return (
    <div className="messages-container">
      <div className="messages-header">
        <h3>Name</h3>
      </div>
      <div className="messages">
        <div className={`message sent ${theme === "L" ? "light" : "dark"}`}>
          <p>Hello how are you?!?!?!?!?!?!</p>
        </div>
        <div className={`message received ${theme === "L" ? "light" : "dark"}`}>
          <p>Hello how are you?!?!?!?!?!?!</p>
        </div>
      </div>
      <div className="messages-input">
        <Input placeholder="Message..." />
        <Button variant="secondary" size="icon">
          <img src={Send} alt="Send" />
        </Button>
      </div>
    </div>
  );
}
