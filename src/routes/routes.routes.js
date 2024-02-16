import express, { Router } from "express";

import { getUsers, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.get("/", getUsers);

export default router;
