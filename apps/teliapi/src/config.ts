export const config = {
  mongoUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`,
  port: 3000,
  host: process.env.API_HOST ?? "127.0.0.1",
};
