// import { ThemeProvider } from "@/components/providers/theme"
// import { Toaster } from "@/components/ui/toaster"
// import { AuthProvider } from "@/context/AuthContext"
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRouter from "@/routes";

export default function App() {
  return (
    // <AuthProvider>
    // <ThemeProvider>
    <TooltipProvider delayDuration={100}>
      <AppRouter />
    </TooltipProvider>
    // <Toaster />
    // </ThemeProvider>
    // </AuthProvider>
  );
}
