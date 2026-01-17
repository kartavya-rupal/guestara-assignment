import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || ""
};

if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
}
