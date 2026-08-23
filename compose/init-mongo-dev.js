print("Initializing MongoDB...");

db = db.getSiblingDB("telitest");

if (!db.getUser("teliuser")) {
  db.createUser({
    user: "teliuser",
    pwd: "telipass",
    roles: [{ role: "readWrite", db: "telitest" }],
  });
}
