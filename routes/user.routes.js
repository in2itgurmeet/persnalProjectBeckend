const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser } = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for user registration, login, update, and deletion
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user account with basic required details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gurmeet Singh
 *               username:
 *                 type: string
 *                 example: gurmeet_01
 *               email:
 *                 type: string
 *                 example: gurmeet@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: MyPass@123
 *               roleName:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 default: USER
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already registered
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login existing user
 *     tags: [Users]
 *     description: Authenticates user and returns JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: gurmeet@example.com
 *               password:
 *                 type: string
 *                 example: MyPass@123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update existing user details
 *     tags: [Users]
 *     description: Updates user information (all fields optional).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: 671cd83fd9b3e64f28b2e23a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gurmeet Updated
 *               username:
 *                 type: string
 *                 example: gurmeet_updated
 *               email:
 *                 type: string
 *                 example: gurmeet.updated@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9999999999"
 *               password:
 *                 type: string
 *                 example: NewPass@123
 *               roleName:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: USER
 *               profileImg:
 *                 type: string
 *                 example: https://example.com/newprofile.png
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1998-09-15
 *               identity:
 *                 type: string
 *                 example: Driving License
 *               married:
 *                 type: string
 *                 enum: [yes, no]
 *                 example: yes
 *               anniversaryDate:
 *                 type: string
 *                 format: date
 *                 example: 2020-05-14
 *               pincode:
 *                 type: string
 *                 example: "123456"
 *               addressLine1:
 *                 type: string
 *                 example: New Street, Model Town
 *               addressLine2:
 *                 type: string
 *                 example: Flat 202, Tower B
 *               city:
 *                 type: string
 *                 example: Chandigarh
 *               state:
 *                 type: string
 *                 example: Punjab
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation failed
 */
router.put("/update/:id", updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     description: Permanently removes a user from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *           example: 671cd83fd9b3e64f28b2e23a
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete/:id", deleteUser);

module.exports = router;
