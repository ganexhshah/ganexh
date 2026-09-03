import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-black dark:text-white ${className}`}>
      <Navbar variant="page" />
      <main className="pt-2 sm:pt-3">{children}</main>
      <Footer />
    </div>
  );
}
