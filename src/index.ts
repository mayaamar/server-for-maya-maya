import mongoose from "mongoose";
import app from "./server";
import config from "./utils/config";

mongoose
    .connect(config.MONGO_URL)
    .then(() => app.listen(config.port, "10.100.11.131" || "localhost" , () => console.log(`app running on port ${config.port}`)))
    .catch((err) => console.log(err));

export default app;
