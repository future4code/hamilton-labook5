import express from "express";
import "express-async-errors";
import { AddressInfo } from "net";
import errorCatcher from "./middlewares/ErrorCatcher";
import { userRoutes } from "./routes/UserRoutes";
import { feedRoutes } from "./routes/FeedRoutes";
import { postRoutes } from "./routes/PostRoutes";
import { refreshTokenRoutes } from "./routes/RefreshTokenRoutes";
import { commentRoutes } from "./routes/CommentRoutes";

const app = express();

app.use(express.json());

app.use("/feed", feedRoutes);
app.use("/post", postRoutes);
app.use("/refreshtoken", refreshTokenRoutes);
app.use("/comment", commentRoutes)
app.use(userRoutes);

app.use(errorCatcher);

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
