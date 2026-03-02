// import { ThemeProvider } from "@/components/providers/theme"
import { Toaster } from "@/shared/components/ui/sonner";
import AppRouter from "@/app/routes";

export default function App() {
  return (
    // <ThemeProvider>
    <>
      <AppRouter />
      <Toaster
        theme="light"
        position="top-right"
        richColors
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
    // </ThemeProvider>
  );
}
