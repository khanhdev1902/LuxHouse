import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: number;
    name: string;
    email: string;
    role: string;
  };
}
