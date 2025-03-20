import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/user.model.js";

export async function createUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (
      !name ||
      !email ||
      !password ||
      typeof email !== "string" ||
      !email.includes("@")
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const userId = await createUser(req.body);
    res.status(201).json({ id: userId, ...req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserByIdController(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (
      !name ||
      !email ||
      !password ||
      typeof email !== "string" ||
      !email.includes("@")
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    await updateUser(req.params.id, req.body);
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await deleteUser(id);
  res.status(200).json({ message: "User deleted" });
};
