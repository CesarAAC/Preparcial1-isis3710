import "./globals.css";
import AuthorProvider from "@/providers/AuthorProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Autores - Preparcial",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <AuthorProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 w-full max-w-6xl">
            {children}
          </main>
        </AuthorProvider>
      </body>
    </html>
  );
}