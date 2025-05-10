import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { keyframes } from "@emotion/react";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

const Home = () => {
  {
    const fullText =
      "Living a gluten-free lifestyle? Ever find yourself frustrated and just wishing you had someone to tell you where to eat, what to cook, or help you make travel plans that align with your lifestyle?\n\n" +
      "You’ve come to the right place.\n\n" +
      "Please sign up or log in if you already have an account, and our chatbot will assist you.";

    const [typedText, setTypedText] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          // Always take the first `index+1` characters from fullText:
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, [fullText]);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#e8fff1",
          textAlign: "center",
          padding: 4,
        }}
      >
        {/* Animated Chat Icon */}
        <Box
          sx={{
            width: 150,
            height: 150,
            mb: 4,
            animation: `${bounce} 2s infinite`,
          }}
        >
          <img
            src="chat_icon.png"
            alt="Chatbot Icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Styled Paragraph */}
        <Typography
          variant="h5"
          sx={{
            whiteSpace: "pre-wrap",
            fontFamily: "Roboto Slab, serif",
            color: "#0b321a",
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: "600px",
            marginBottom: 4,
          }}
        >
          {typedText}
        </Typography>
      </Box>
    );
  }
};

export default Home;
