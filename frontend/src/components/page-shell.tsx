import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      <Navbar variant="page" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
