import { apiHandler, omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const getMembers = async (req, res) => {
    const { db } = await connectToDatabase();
    // return users without hashed passwords in the response

    const members = await db.collection("members").find().toArray();
    const response = members.map((x) => omit(x, "hash"));
    return res.status(200).json(response);
};

export default apiHandler({
    get: getMembers,
});
