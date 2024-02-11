import env from "env-var";

export default {
    port: env.get("PORT").default(3000).asPortNumber(),
    MONGO_URL: env.get("MONGOOSE_URL").default("mongodb://localhost:27017/shop").asString(),
    shragaUrl: "https://shraga.shraga.branch-yesodot.org",
    callbackURL: "http://10.100.11.131:3000/auth/callback",
    secret: "secret",
    useEnrichId: false,
};
