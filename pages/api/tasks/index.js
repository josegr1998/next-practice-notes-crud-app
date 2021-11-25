import mongoose from "mongoose";
import connectDB from "../../../utils/dbConnect";
import Task from "../../../models/Task";

connectDB();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const tasks = await Task.find({});

      res.status(200).json({ message: "success", data: tasks });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  if (req.method === "POST") {
    try {
      const newTask = await Task.create(req.body);

      res.status(201).json({ message: "success", data: newTask });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
