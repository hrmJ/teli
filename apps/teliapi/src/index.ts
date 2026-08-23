import { connectMongoose } from "@teliapi/infrastructure/mongoose";
import { makeApp } from "./app.ts";
import { config } from "./config.ts";

const app = makeApp();
await connectMongoose(config.mongoUrl);

app.listen(config.port, config.host, () => {
  console.log("Teliapi is ready.");
});
