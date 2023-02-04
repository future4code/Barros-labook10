import express from "express";
import { FriendShipController } from "../FriendShipController";

const friendShipController = new FriendShipController()

export const friendShipRouter= express.Router();

friendShipRouter.post('/create', friendShipController.addFriend)
friendShipRouter.delete('/friendship/:id', friendShipController.deleteFriend)