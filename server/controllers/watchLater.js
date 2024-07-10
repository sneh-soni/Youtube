import watchLater from "../models/watchLater.js";

export const watchLaterController = async (req, res) => {
  const watchLaterData = req.body;
  const addTowatchLater = new watchLater(watchLaterData);

  try {
    await addTowatchLater.save();
    return res.status(200).json("added to watchLater");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllwatchLaterController = async (req, res) => {
  try {
    const files = await watchLater.find();
    return res.status(200).send(files);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export const deletewatchLaterController = async (req, res) => {
  const { videoId: videoId, Viewer: Viewer } = req.params;
  try {
    await watchLater.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });
    return res.status(200).json({ message: "Removed  from your watch Laters" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
