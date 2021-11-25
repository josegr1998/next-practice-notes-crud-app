import mongoose from "mongoose";
import Task from "../../../models/Task";
import connectDB from "../../../utils/dbConnect";

connectDB();

export default async (req, res) => {
  const id = req.query.id;
  console.log(id);

  if (req.method === "GET") {
    try {
      const task = await Task.findById(id);
      console.log(task);
      if (!task) {
        return res.status(404).json({ messgae: "no task found" });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  if (req.method === "PATCH") {
    try {
      const editTask = await Task.findByIdAndUpdate(id, req.body);

      res.status(200).json({ success: true, data: editTask });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        res.status(404).json({ message: "no note with such id" });
      }
      res.status(200).json({ success: true, data: deletedTask });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};
