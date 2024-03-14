import env from "env-var";

export default {
    port: env.get("PORT").default(3000).asPortNumber(),
    MONGO_URL: env.get("MONGO_URL").default("mongodb://127.0.0.1:27017/store").asString(),
    shragaUrl: "https://shraga.shraga.branch-yesodot.org",
    callbackURL: "http://localhost:3000/auth/callback",
    secret: "secret",
    useEnrichId: false,
};
