import express from "express";
import {
  HistoryController,
  deleteHistoryController,
  getAllHistoryController,
} from "../controllers/History.js";
import { likeController } from "../controllers/like.js";
import {
  deleteLikeVideoController,
  getAlllikeVideoController,
  likeVideoController,
} from "../controllers/likeVideo.js";
import { getAllvideos, uploadVideo } from "../controllers/video.js";
import { viewController } from "../controllers/views.js";
import {
  deletewatchLaterController,
  getAllwatchLaterController,
  watchLaterController,
} from "../controllers/watchLater.js";
import upload from "../Helpers/fileHelpers.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/uploadVideo", auth, upload.single("file"), uploadVideo);
routes.get("/getvideos", getAllvideos);
routes.patch("/like/:id", auth, likeController);
routes.patch("/view/:id", viewController);
routes.post("/likeVideo", auth, likeVideoController);
routes.get("/getAlllikeVideo", getAlllikeVideoController);
routes.delete(
  "/deleteLikedVideo/:videoId/:Viewer",
  auth,
  deleteLikeVideoController
);
routes.post("/watchLater", auth, watchLaterController);
routes.get("/getAllwatchLater", getAllwatchLaterController);
routes.delete(
  "/deleteWatchlater/:videoId/:Viewer",
  auth,
  deletewatchLaterController
);
routes.post("/History", auth, HistoryController);
routes.get("/getAllHistory", getAllHistoryController);
routes.delete("/deleteHistory/:userId", auth, deleteHistoryController);

export default routes;
