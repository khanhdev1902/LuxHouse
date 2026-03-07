import { Request } from 'express';

export interface UserRequest {
  userId: number;
  name: string;
  email: string;
  role: 'CUSTOMMER' | 'ADMIN';
}

export interface AuthRequest extends Request {
  user: UserRequest;
}
