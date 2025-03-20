import { expect } from "chai";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/user.model.js";

describe("User Model", () => {
  let userId;

  before(async () => {
    // Create a test user
    const user = {
      name: "Test User",
      email: "test.user@example.com",
      password: "password123",
    };
    userId = await createUser(user);
  });

  after(async () => {
    // Clean up test data
    await deleteUser(userId);
  });

  describe("createUser", () => {
    it("should create a user and return the user ID", async () => {
      const user = {
        name: "New User",
        email: "new.user@example.com",
        password: "password123",
      };

      const newUserId = await createUser(user);
      expect(newUserId).to.be.a("number");

      // Clean up
      await deleteUser(newUserId);
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users", async () => {
      const users = await getAllUsers();
      expect(users).to.be.an("array");
      expect(users).to.have.length.greaterThan(0);
    });
  });

  describe("getUserById", () => {
    it("should retrieve a user by ID", async () => {
      const user = await getUserById(userId);
      expect(user).to.have.property("id", userId);
      expect(user).to.have.property("name", "Test User");
    });

    it("should return undefined for a non-existent user", async () => {
      const user = await getUserById(9999);
      expect(user).to.be.undefined;
    });
  });

  describe("updateUser", () => {
    it("should update a user successfully", async () => {
      const updatedUser = {
        name: "Updated User",
        email: "updated.user@example.com",
        password: "newpassword123",
      };

      await updateUser(userId, updatedUser);
      const user = await getUserById(userId);

      expect(user).to.include(updatedUser);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user successfully", async () => {
      const user = {
        name: "Delete User",
        email: "delete.user@example.com",
        password: "password123",
      };

      const newUserId = await createUser(user);
      await deleteUser(newUserId);

      const deletedUser = await getUserById(newUserId);
      expect(deletedUser).to.be.undefined;
    });
  });
});
