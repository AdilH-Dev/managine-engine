import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  const location = useLocation();
  const hasSubSidebar = location.pathname.startsWith("/setup");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar(s) */}
      <div className="fixed left-0 top-0 h-screen flex">
        <Sidebar />
      </div>

      {/* Adjust main content offset */}
      <div
        className={`flex-1 flex flex-col transition-all ${
          hasSubSidebar ? "ml-[262px]" : "ml-[72px]"
        }`}
      >
        {/* Header */}
        <div className="sticky w-full top-0 z-50 bg-background">
          <Header title={title} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
