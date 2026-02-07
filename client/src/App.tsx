// import { ThemeProvider } from "@/components/providers/theme"
// import { Toaster } from "@/components/ui/toaster"
// import { AuthProvider } from "@/context/AuthContext"
import AppRouter from "@/routes";

export default function App() {
  return (
    // <AuthProvider>
    // <ThemeProvider>
      <AppRouter />
    // <Toaster />
    // </ThemeProvider>
    // </AuthProvider>
  );
}
