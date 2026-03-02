export interface User {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "CUSTOMMER";
  addresses?: UserAddresses[];
}
export interface UserAddresses {
  name: string;
  phone: string;
  address: string;
  city: string;
}
