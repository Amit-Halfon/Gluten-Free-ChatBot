import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (token: string) => {
  try {
    const res = await axios.post("/user/signup", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Unable to signup");
  }
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string, token: string) => {
  const res = await axios.post(
    "/chat/new",
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async (token: string) => {
  const res = await axios.get("/chat/all-chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to load chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async (token: string) => {
  const res = await axios.delete("/chat/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chat");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to log out");
  }
  const data = await res.data;
  return data;
};
