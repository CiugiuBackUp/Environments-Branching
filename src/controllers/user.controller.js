import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../models/user.model.js';

export async function createUserController(req, res) {
  try {
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
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUserController(req, res) {
  try {
    await updateUser(req.params.id, req.body);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteUserController(req, res) {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
