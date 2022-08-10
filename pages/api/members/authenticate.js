const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import getConfig from "next/config";

import { apiHandler } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const { serverRuntimeConfig } = getConfig();

var authenticate = async (req, res) => {
    const { db } = await connectToDatabase();
    const { email, password } = req.body;
    const member = await db.collection("members").findOne({ email: email });

    // validate
    if (!(member && bcrypt.compareSync(password, member.hash))) {
        throw "Username or password is incorrect";
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: member.id }, serverRuntimeConfig.secret, { expiresIn: "1d" });

    // return basic user details and token
    return res.status(200).json({
        id: member._id,
        username: member.username,
        token,
        isAdmin: true,
        email: member.email,
        skill: member.skill,
    });
};

export default apiHandler({
    post: authenticate,
});
