const appDb = db.getSiblingDB("teliapi2");

appDb.createUser({
  user: process.env.TELIAPI_MONGO_USER,
  pwd: process.env.TELIAPI_MONGO_PASSWORD,
  roles: [{ role: "readWrite", db: "teliapi2" }],
});
