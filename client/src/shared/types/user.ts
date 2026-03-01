export interface User {
  id: string;
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
