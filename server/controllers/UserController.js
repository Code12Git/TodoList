import User from "../models/User.js";

//Updating User
export const updateUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Deleting User
export const deleteUser = (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({ message: "User deleted" });
        }
      });
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
