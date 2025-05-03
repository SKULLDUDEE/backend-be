import ChatBot from "../Models/ChatBot.js";

// Get the single ChatBot
export const getChatBot = async (req, res) => {
    try {
        let chatBot = await ChatBot.findOne({});
        if (!chatBot) {
            // Create a default ChatBot if none exists
            chatBot = new ChatBot({
                headerColor: "#33475B",
                backgroundColor: "#FAFBFC",
                customMessages: ["How how may I assist you?", "What can I do for you today?"],
                welcomeMessage: "👋 Have any concerns tap me ",
                missedChatTimer: "01:00:00"
            });
            await chatBot.save();
            console.log("Created default ChatBot configuration");
        }
        res.status(200).json(chatBot);
    } catch (error) {
        console.error("Error in getChatBot:", error);
        res.status(500).json({ message: "Error fetching ChatBot", error: error.message });
    }
};

// Update the single ChatBot
export const updateChatBot = async (req, res) => {
    try {
        const updates = req.body;

        const updatedChatBot = await ChatBot.findOneAndUpdate({}, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedChatBot) {
            return res.status(404).json({ message: "ChatBot not found" });
        }

        res.status(200).json(updatedChatBot);
    } catch (error) {
        res.status(500).json({ message: "Error updating ChatBot", error: error.message });
    }
};

// Create the single ChatBot
export const createChatBot = async (req, res) => {
    try {
        const chatBot = new ChatBot(req.body);
        await chatBot.save();
        res.status(201).json(chatBot);
    } catch (error) {
        res.status(500).json({ message: "Error creating ChatBot", error: error.message });
    }
};