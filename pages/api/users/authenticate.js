const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import getConfig from "next/config";

import { apiHandler } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const { serverRuntimeConfig } = getConfig();

var authenticate = async (req, res) => {
    const { db } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email: email });

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw "Username or password is incorrect";
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: "1d" });

    // return basic user details and token
    return res.status(200).json({
        id: user._id,
        username: user.username,
        token,
        isAdmin: user.isAdmin,
        email: user.email,
    });
};

export default apiHandler({
    post: authenticate,
});
