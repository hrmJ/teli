import { AuthorModel } from "@teliapi/infrastructure/mongoose";
import mongoose from "mongoose";

export async function resetDb() {
  if (!mongoose.connection.db) {
    console.log("db not ready");
    return;
  }
  const dbName = mongoose.connection.db.databaseName;

  if (!dbName.includes("test")) {
    throw new Error(`Refusing to reset a non-test database`);
  }

  await AuthorModel.deleteMany();
}
