import { makeApp } from "./app.ts";
const app = makeApp();
app.listen(3000, "127.0.0.1", () => {
  console.log("listening...");
});
