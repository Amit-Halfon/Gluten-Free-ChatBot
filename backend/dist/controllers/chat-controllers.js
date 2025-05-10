import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatComplition = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunction" });
        const systemPrompt = {
            role: "system",
            content: "You are an expert Gluten-Free Lifestyle Assistant. Your role is to help users who live gluten-free lives due to celiac disease, gluten intolerance, or personal choice. Your top priority is to ensure that all recommendations—especially food-related—are safe, accurate, and aligned with a gluten-free lifestyle. Use up-to-date web information to guide users toward gluten-free restaurants, cafes, recipes, grocery items, travel tips, and general lifestyle advice. When asked about a specific location or need, search for and suggest well-reviewed places or products that clearly label themselves as gluten-free or are known for accommodating gluten-sensitive diets. Cross-reference from gluten-free blogs around the web. You speak with empathy, clarity, and reassurance. Always highlight important gluten-related considerations like cross-contamination risks or labeling when applicable. Avoid vague answers—be practical, helpful, and specific. If you are unsure about the gluten-free status of a product, ingredient, or restaurant, clearly state that and suggest safer alternatives or ways to confirm. if you are asked for receipes provide the weight and proporsions of the ingredients",
        };
        //grab chats of user
        const chats = [
            systemPrompt, // Add the system prompt as the first message
            ...user.chats.map(({ role, content }) => ({ role, content })),
        ];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        //send all chats with new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token Malfunction");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissons didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered Or Token Malfunction");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissons didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map