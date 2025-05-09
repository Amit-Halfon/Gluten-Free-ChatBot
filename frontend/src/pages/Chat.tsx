import React from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

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
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#7ec18e",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", color: "#0b321a" }}
          >
            You are talking to a ChatBOT
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 4,
              p: 3,
              color: "#0b321a",
            }}
          >
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
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
            // onClick={handleDeleteChats}
            sx={{
              width: "200px",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              bgcolor: red[300],
              alignSelf: "flex-end",
              my: "auto",
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
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            marginTop: 3,
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#7ec18e",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            // ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            //onClick={handleSubmit}
            sx={{ color: "white", mx: 1 }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
