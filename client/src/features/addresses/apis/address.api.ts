import { apiHandler } from "@/helper/api.help";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import type { AddressType, UpdateAddressType } from "../types/address.type";

const getLstUserAddresses = () => apiHandler(http.get(API_ENDPOINTS.USERADDRESS));

const createAddress = (data: Omit<AddressType, "id" | "isDefault">) =>
  apiHandler(http.post(API_ENDPOINTS.USERADDRESS, data));

const updateAddress = (id: number, data: UpdateAddressType) =>
  apiHandler(http.patch(`${API_ENDPOINTS.USERADDRESS}/${id}`, data));

const deleteAddress = (id: number) => apiHandler(http.delete(`${API_ENDPOINTS.USERADDRESS}/${id}`));

const setDefaultAddress = (id: number) =>
  apiHandler(http.patch(`${API_ENDPOINTS.USERADDRESS}/${id}`, { isDefault: true }));

export const addressAPI = {
  getLstUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
