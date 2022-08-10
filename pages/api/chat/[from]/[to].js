import { apiHandler } from "../../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const getMessages = async (req, res) => {
    const { db } = await connectToDatabase();

    const { from, to } = req.query;

    const messages = await db
        .collection("messages")
        .find({
            users: {
                $all: [from, to],
            },
        })
        .sort({ updatedAt: 1 })
        .toArray();

    const projectedMessages = messages?.map((msg) => {
        return {
            sender: msg.sender.toString(),
            message: msg.message.text,
            id: msg._id || msg.id,
            createdAt: msg.createdAt,
        };
    });

    res.status(200).json(projectedMessages);
};

export default apiHandler({
    get: getMessages,
});
