import { useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const auth = useAuth();
  const { user, getAccessTokenSilently } = useAuth0();
  const fullName = user?.given_name || "";

  // pick sizes by length (tweak thresholds to your taste)
  const fontSize =
    fullName.length <= 4
      ? "1.25rem"
      : fullName.length <= 8
      ? "1rem"
      : fullName.length <= 12
      ? "0.875rem"
      : "0.75rem";

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const token = await getAccessTokenSilently();
    const chatData = await sendChatRequest(content, token);
    setChatMessages([...chatData.chats]);
    //
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      const token = await getAccessTokenSilently();
      await deleteUserChats(token);
      setChatMessages([]);
      toast.success("Successfully deleted chats", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getAccessTokenSilently().then((token) => {
        getUserChats(token)
          .then((data) => {
            setChatMessages([...data.chats]);
            toast.success("Successfully loaded chats", { id: "loadchats" });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Loading Failed", { id: "loadchats" });
          });
      });
    }
  }, [user]);

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
            boxShadow:
              "8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.6)",
            transform: "perspective(600px) rotateX(3deg)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "perspective(600px) rotateX(0deg)",
            },
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
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
            <img
              src="gluten_free_icon2.png" // Replace with the correct path
              alt="Gluten-Free Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              color: "#0b321a",
              fontSize: "1.2rem",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Welcome To The Gluten Free ChatBOT
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 4,
              p: 3,
              color: "#0b321a",
              fontSize: "1.2rem",
              maxWidth: "90%", // Adjust to fit content
              boxSizing: "border-box",
              overflowWrap: "break-word",
            }}
          >
            Feel free to ask any questions related to gluten-free diets,
            recipes, or lifestyle tips. I'm here to help you navigate your
            gluten-free lifestyle.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 3,
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
            {user?.given_name}
          </Avatar>
          <Button
            onClick={handleDeleteChats}
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
            px: 2, // theme.spacing(2) == 16px
            py: 1, // optional vertical breathing room
            boxSizing: "border-box",
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
            ref={inputRef}
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
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
