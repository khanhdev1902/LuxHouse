export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserWithoutPassword = Omit<User, 'password'>;
