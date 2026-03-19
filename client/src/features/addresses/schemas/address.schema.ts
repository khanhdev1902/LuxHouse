import * as z from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(2, "Tên gì mà ngắn thế cưng? (tối thiểu 2 ký tự)"),
  phoneNumber: z
    .string()
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không đúng định dạng VN rồi!"),
  addressType: z.enum(["HOME", "OFFICE", "OTHER"]),
  province: z.string().min(1, "Chọn tỉnh/thành phố đê"),
  district: z.string().min(1, "Quận/huyện đâu?"),
  ward: z.string().min(1, "Phường/xã nữa nè"),
  streetAddress: z.string().min(5, "Địa chỉ cụ thể tí cho shipper dễ tìm (tối thiểu 5 ký tự)"),
  // isDefault: z.boolean().default(false),
  isDefault: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
