import Todo from "../models/Todo.js";

//Add Todo
export const AddTodoController = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({
      title,
      description,
    });

    const existingTodo = await Todo.findOne({ title, description });

    if (existingTodo) {
      return res.status(400).json({ message: "Todo already exists" });
    }
    await todo.save();
    res.status(201).json({ message: "Todo Added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update Todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).json("User deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
//Get All Todo
export const GetAllTodoController = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
};
