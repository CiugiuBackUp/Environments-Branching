import { query } from './db.js';

const createUserTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await query(sql);
};

createUserTable().then(() => console.log('Users table ready')).catch(console.error);

export async function createUser(user) {
    const [result] = await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
    return result.insertId;
}
export async function getAllUsers() {
    const [rows] = await query('SELECT * FROM users');
    return rows;
}
export async function getUserById(id) {
    const [rows] = await query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}
export async function updateUser(id, user) {
    await query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [user.name, user.email, user.password, id]);
}
export async function deleteUser(id) {
    await query('DELETE FROM users WHERE id = ?', [id]);
}
