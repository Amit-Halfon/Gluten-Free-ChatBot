import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <img src="chat_icon.png" alt="chatbot" width={"60px"} height={"60px"} />{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          marginRight: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 10px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>GlutenFree</span>ChatBot
      </Typography>
    </div>
  );
};

export default Logo;
