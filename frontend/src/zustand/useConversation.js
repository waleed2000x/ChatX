import { create } from "zustand";

const useConversation = create((set) => {
  // Get selectedConversation from localStorage, if available
  const storedSelectedConversation = localStorage.getItem(
    "selectedConversation"
  );

  return {
    selectedConversation: storedSelectedConversation
      ? JSON.parse(storedSelectedConversation)
      : null,
    setSelectedConversation: (selectedConversation) => {
      // Save selectedConversation to localStorage
      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(selectedConversation)
      );
      set({ selectedConversation });
    },
    messages: [],
    setMessages: (messages) => set({ messages }),
  };
});

export default useConversation;
