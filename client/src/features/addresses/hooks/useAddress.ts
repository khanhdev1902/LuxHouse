import { tokenManager } from "@/lib/tokenManager";
import type { AddressType, UpdateAddressType } from "../types/address.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addressAPI } from "../apis/address.api";
import { toast } from "sonner";

export default function useAddress() {
  const queryClient = useQueryClient();
  const accessToken = tokenManager.getAccessToken();

  const query = useQuery<AddressType[]>({
    queryKey: ["addresses"],
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await addressAPI.getLstUserAddresses();
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newAddr: Omit<AddressType, "id" | "isDefault">) =>
      addressAPI.createAddress(newAddr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Đã thêm địa chỉ mới cho LuxHouse!");
    },
    onError: () => toast.error("Thêm địa chỉ thất bại rồi cưng ơi!"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAddressType }) =>
      addressAPI.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Cập nhật địa chỉ thành công!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => addressAPI.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Đã gỡ bỏ địa chỉ khỏi sổ tay!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Không xóa được rồi!");
    },
  });

  const onCreate = (data: any) => createMutation.mutate(data);
  const onUpdate = (id: number, data: any) => updateMutation.mutate({ id, data });
  const onDelete = (id: number) => {
    if (window.confirm("Cưng có chắc muốn xóa địa chỉ này không? Tiếc lắm đấy!")) {
      deleteMutation.mutate(id);
    }
  };

  return {
    addresses: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    onCreate,
    onUpdate,
    onDelete,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}
