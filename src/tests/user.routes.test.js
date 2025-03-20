import request from "supertest";
import app from "../../server.js";
import { expect } from "chai";

describe("User Routes", () => {
  const userId = 1;
  describe("POST /api/users", () => {
    it("should create a new user successfully", async () => {
      const newUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        email: `john.doe${Math.floor(Math.random() * 10000)}@example.com`,
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201);

      expect(response.body).to.have.property("id");
      expect(response.body).to.include({
        name: newUser.name,
        email: newUser.email,
      });
    });

    it("should return an error for invalid input", async () => {
      const invalidUser = {
        name: "",
        email: "invalid-email",
        password: "",
      };

      const response = await request(app)
        .post("/api/users")
        .send(invalidUser)
        .expect(400);

      expect(response.body).to.have.property("error");
    });
  });

  describe("GET /api/users", () => {
    it("should retrieve all users", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).to.be.an("array");
    });
  });

  describe("GET /api/users/:id", () => {
    it("should retrieve a user by ID", async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).to.have.property("id", userId);
    });

    it("should return 404 for a non-existent user", async () => {
      const response = await request(app).get("/api/users/119119").expect(404);

      expect(response.body).to.have.property("message", "User not found");
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update a user successfully", async () => {
      const updatedUser = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "newpassword123",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser)
        .expect(200);

      expect(response.body).to.have.property("message", "User updated");
    });

    it("should return an error for invalid input", async () => {
      const invalidUser = {
        name: "",
        email: "invalid-email",
        password: "",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(invalidUser)
        .expect(400);

      expect(response.body).to.have.property("error");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user successfully", async () => {
      const newUser = {
        name: "JohnDoe",
        email: "johndoe@example.com",
        password: "passwrd123",
      };

      const response = await request(app).post("/api/users").send(newUser);

      const userId = response.body.id;
      // console.log("User ID to delete:", userId);

      const deleteResponse = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(deleteResponse.body).to.have.property("message", "User deleted");
    });

    it("should return 404 for a non-existent user", async () => {
      const nonExistentUserId = "507f1f77bcf86cd799439011"; // Example non-existent ID
      const response = await request(app)
        .delete(`/api/users/${nonExistentUserId}`)
        .expect(404);

      expect(response.body).to.have.property("error");
    });
  });
});
