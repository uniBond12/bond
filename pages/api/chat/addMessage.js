import getConfig from "next/config";

import { apiHandler } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

var addMessage = async (req, res) => {
    const { db } = await connectToDatabase();

    const { from, to, message } = req.body;
    const data = await db.collection("messages").insertOne({
        message: { text: message },
        users: [from, to],
        sender: from,
        createdAt: Date.now(),
    });

    if (data) return res.status(200).json({ msg: "Message added successfully.", id: data?.insertedId });
};

export default apiHandler({
    post: addMessage,
});
