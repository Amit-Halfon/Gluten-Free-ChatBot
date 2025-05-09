import { Box, Typography } from "@mui/material";
import React from "react";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  return role === "assistant" ? (
    <Box className={`message bot`}>
      <Typography color="inherit" fontSize={"20px"}>
        {content}
      </Typography>
    </Box>
  ) : (
    <Box className={`message user`}>
      <Typography fontSize={"20px"}>{content}</Typography>
    </Box>
  );
};

export default ChatItem;
