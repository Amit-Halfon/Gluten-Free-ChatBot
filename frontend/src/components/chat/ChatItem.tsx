import { Box, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  return role === "assistant" ? (
    <Box className={`message bot`}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <Typography component="p" sx={{ color: "#0b321a" }} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{ marginBottom: "0.5em", color: "#0b321a" }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  ) : (
    <Box className={`message user`}>
      <Typography fontSize={"20px"}>{content}</Typography>
    </Box>
  );
};

export default ChatItem;
