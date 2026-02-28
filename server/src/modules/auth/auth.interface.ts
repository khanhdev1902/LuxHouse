export interface IAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: string;
  crsfToken: string;
}
export type ILoginResponse = Omit<IAuth, 'refreshToken'>;

export interface IAuthPayload {
  userId: number;
  email: string;
  exp: number;
  iat: number;
}
