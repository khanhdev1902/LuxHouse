export type AddressType = {
  id: number;
  addressType: "HOME" | "OFFICE" | "OTHER";
  fullName: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  isDefault: boolean;
};

export type UpdateAddressType = Partial<AddressType>;
