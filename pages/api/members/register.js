const bcrypt = require("bcryptjs");

import { apiHandler } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

var register = async (req, res) => {
    const { db } = await connectToDatabase();
    const { password, ...member } = req.body;

    const oldMember = await db.collection("members").findOne({ email: member.email });
    if (oldMember) throw `Member with the username "${member.email}" already exists`;

    // hash password
    member.hash = bcrypt.hashSync(password, 10);

    await db.collection("members").insertOne(member);
    return res.status(200).json({});
};

export default apiHandler({
    post: register,
});
