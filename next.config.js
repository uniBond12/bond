/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        MONGODB_URI:
            "mongodb://ibad12:callofduty123456.@ac-bx1hyft-shard-00-00.3l9etec.mongodb.net:27017,ac-bx1hyft-shard-00-01.3l9etec.mongodb.net:27017,ac-bx1hyft-shard-00-02.3l9etec.mongodb.net:27017/?ssl=true&replicaSet=atlas-3iqehh-shard-0&authSource=admin&retryWrites=true&w=majority",
        DB_NAME: "UniBond",
        apiUrl:
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000" // development api
                : "https://uni-bond.vercel.app", // production api
    },
    serverRuntimeConfig: {
        secret: "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, IT CAN BE ANY STRING",
    },
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000" // development api
                : "https://uni-bond.herokuapp.com", // production api
    },
};

module.exports = nextConfig;
