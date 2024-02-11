import jwt from "jsonwebtoken";
import config from "../utils/config";

export const parseJWT = (token: string) => {
    const payload = jwt.verify(token, Buffer.from(config.secret, "base64"), {
        clockTimestamp: Date.now() / 1000,
    });
    if (typeof payload !== "object") throw new Error("Invalid token");
   return payload;
};
