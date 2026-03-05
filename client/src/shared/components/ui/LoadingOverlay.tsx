import { Loader2 } from "lucide-react";

export const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50 opacity-40">
      <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
    </div>
  );
};
