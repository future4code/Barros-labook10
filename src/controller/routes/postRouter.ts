import express from "express";
import { PostController } from "../PostController";

const postController = new PostController()

export const postRouter= express.Router();

postRouter.post('/create', postController.create)
postRouter.get('/getbyid/:id', postController.getById)