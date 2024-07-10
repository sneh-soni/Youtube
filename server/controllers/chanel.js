import mongoose from "mongoose";
import users from "../models/auth.js";

export const updateChanelData = async (req, res) => {
  const { _id } = req.params;
  const { name, desc } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Chanel Unavailable..");
  }
  try {
    const updateData = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: name,
          desc: desc,
        },
      },
      { new: true }
    );

    return res.status(200).json(updateData);
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

export const getAllChanels = async (req, res) => {
  try {
    const allChanels = await users.find();

    const allChanelDetails = [];
    allChanels.forEach((chanel) => {
      allChanelDetails.push({
        _id: chanel._id,
        name: chanel.name,
        email: chanel.email,
        desc: chanel.desc,
      });
    });
    return res.status(200).json(allChanelDetails);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
