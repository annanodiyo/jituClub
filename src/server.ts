import express, { Request, Response, json } from "express";
import cors from "cors";
import { testSqlConnection } from "./config/sqlConfig";

const app = express();
app.use(json());
app.use(cors());
// app.use((error: Error, req: Request, res: Response) => {
//   res.json({
//     message: error.message,
//   });
// });
// app.use("/user", user_router);
// app.use("/review", review_router);
// app.use("/event", event_router);

app.listen(3800, () => {
  console.log("server is running on 3800");
  testSqlConnection();
});
