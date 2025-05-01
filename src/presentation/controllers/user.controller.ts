import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../application/user/user.service';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updated = await userService.updateUser(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getMyStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const user = await userService.getMyStatus(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
