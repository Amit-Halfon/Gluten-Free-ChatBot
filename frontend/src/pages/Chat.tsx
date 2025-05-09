import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";

const chatMessages = [
  {
    role: "user",
    content: "Hi there! Can you tell me a joke?",
  },
  {
    role: "assistant",
    content:
      "Sure! Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    role: "user",
    content: "Haha, that’s great. Now, what’s the capital of Japan?",
  },
  {
    role: "assistant",
    content: "The capital of Japan is Tokyo.",
  },
];

const Chat = () => {
  const auth = useAuth();
  const fullName = auth?.user?.name || "";

  // pick sizes by length (tweak thresholds to your taste)
  const fontSize =
    fullName.length <= 4
      ? "1.25rem"
      : fullName.length <= 8
      ? "1rem"
      : fullName.length <= 12
      ? "0.875rem"
      : "0.75rem";
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.5,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "white",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <header className="chatbot-header">
            <Avatar
              sx={{
                ml: 2,
                my: 1,
                width: 64,
                height: 64,
                fontSize,
                textAlign: "center",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                bgcolor: "#e8fff1",
                color: "#0b321a",
                fontWeight: 700,
              }}
            >
              {" "}
              {auth?.user?.name}
            </Avatar>
            <Button
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: "700",
                borderRadius: 3,
                ml: "auto",
                bgcolor: red[300],
                ":hover": {
                  bgcolor: red.A400,
                },
              }}
            >
              Clear Conversation
            </Button>
          </header>
          <Box
            sx={{
              flex: 1,
              padding: "10px",
              overflow: "scroll",
              overflowX: "hidden",
              width: "100%",
              scrollBehavior: "smooth",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 } }}></Box>
    </Box>
  );
};

export default Chat;
