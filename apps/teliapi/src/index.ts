/* eslint-disable no-await-in-loop */
// import bodyparser from 'body-parser';
// import cors from 'cors';
import { makeApp } from "./app.ts";
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth';
// import publicationRoutes from './routes/publication';
// import authorRoutes from './routes/author';
// import receptionRoutes from './routes/reception';

// const db = mongoose.connect("mongodb://telimongo:27017/teli", {
//   useNewUrlParser: true,
// });
const app = makeApp();

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || process.env.CORS_ORIGIN.split(" ").includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log(origin);
//       console.log(process.env.CORS_ORIGIN.split(" "));
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "PUT", "POST", "DELETE"],
// };

// app.use(cors(corsOptions));
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.use('/', authorRoutes);
// app.use('/', receptionRoutes);
// app.use('/', publicationRoutes);
// app.use('/', authRoutes);
app.use("/status", (_, res) => {
  res.status(200).send({ status: "ok" });
});

// app.listen(3000, "0.0.0.0", () => {
//   console.log("listening..");
//   console.log(process.env.CORS_ORIGIN);
// });

app.listen(3000, "127.0.0.1", () => {
  console.log("listening..");
});
