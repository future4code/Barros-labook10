import express from "express";
import { UserController } from "../UserController";

const userController = new UserController()

export const userRouter= express.Router();

userRouter.post('/create', userController.create)