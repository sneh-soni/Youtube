import comment from "../models/comments.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
  const commentData = req.body;
  const postcomment = new comment(commentData);
  try {
    await postcomment.save();
    return res.status(200).json("posted the comment");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getComment = async (req, res) => {
  try {
    const commentList = await comment.find();
    return res.status(200).send(commentList);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Comments Unavailable..");
  }
  try {
    await comment.findByIdAndDelete(_id);
    return res.status(200).json({ message: "deleted comment" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment Unavailable..");
  }
  try {
    const updateComment = await comment.findByIdAndUpdate(_id, {
      $set: { commentBody: commentBody },
    });
    return res.status(200).json(updateComment);
  } catch (error) {
    return res.status(400).json(error);
  }
};
