import { apiHandler } from "../../../utils/helpers/api";
import { omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const getByName = async (req, res) => {
    const { db } = await connectToDatabase();
    // return users without hashed passwords in the response

    const user = await db.collection("users").findOne({ email: req.query.email });
    if (!user) throw "User Not Found";

    return res.status(200).json(omit(user, "hash"));
};

export default apiHandler({
    get: getByName,
});
