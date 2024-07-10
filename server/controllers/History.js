import History from "../models/History.js";

export const HistoryController = async (req, res) => {
  const HistoryData = req.body;
  const addToHistory = new History(HistoryData);
  try {
    await addToHistory.save();
    return res.status(200).json("added to History");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllHistoryController = async (req, res) => {
  try {
    const files = await History.find();
    return res.status(200).send(files);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export const deleteHistoryController = async (req, res) => {
  const { userId: userId } = req.params;
  try {
    await History.deleteMany({
      Viewer: userId,
    });
    return res.status(200).json({ message: "Removed  from your watch Laters" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
