import { apiHandler } from "../../../utils/helpers/api";
import { omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";

const getByName = async (req, res) => {
    const { db } = await connectToDatabase();
    // return users without hashed passwords in the response

    const mmember = await db.collection("members").findOne({ email: req.query.email });
    if (!mmember) throw "Member Not Found";

    return res.status(200).json(omit(mmember, "hash"));
};

export default apiHandler({
    get: getByName,
});
