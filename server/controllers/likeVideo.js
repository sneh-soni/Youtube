import likedVideo from "../models/likedVideo.js";

export const likeVideoController = async (req, res) => {
  const likedVideoData = req.body;
  const addToLikedVideo = new likedVideo(likedVideoData);
  try {
    await addToLikedVideo.save();
    return res.status(200).json("added to likedVideo");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAlllikeVideoController = async (req, res) => {
  try {
    const files = await likedVideo.find();
    return res.status(200).send(files);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export const deleteLikeVideoController = async (req, res) => {
  const { videoId: videoId, Viewer: Viewer } = req.params;
  try {
    await likedVideo.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });
    return res.status(200).json({ message: "Removed  from your watch Laters" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
