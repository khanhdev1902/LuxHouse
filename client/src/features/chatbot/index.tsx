import ChatToggle from "./components/ChatToggle";
import useToggle from "@/shared/hooks/useToggle";
import ChatBox from "./components/ChatBox";

export default function ChatBot() {
  const { value: isOpen, toggle, off } = useToggle();
  return (
    <>
      <ChatToggle toggle={toggle} isOpen={isOpen} />
      <ChatBox toggle={off} isOpen={isOpen} />
    </>
  );
}
