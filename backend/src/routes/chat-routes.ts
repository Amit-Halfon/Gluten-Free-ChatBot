import { Router } from "express";
import { checkJwt } from "../utils/token-manager.js";
import {
  deleteChats,
  generateChatComplition,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

//protected API
const chatRoutes = Router();
chatRoutes.post("/new", checkJwt, generateChatComplition);

chatRoutes.get("/all-chats", checkJwt, sendChatsToUser);
chatRoutes.delete("/delete", checkJwt, deleteChats);

export default chatRoutes;
