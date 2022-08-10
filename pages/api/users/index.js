import { apiHandler, omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const getUsers = async (req, res) => {
    const { db } = await connectToDatabase();
    // return users without hashed passwords in the response

    const users = await db.collection("users").find().toArray();
    const response = users.map((x) => omit(x, "hash"));
    return res.status(200).json(response);
};

export default apiHandler({
    get: getUsers,
});
