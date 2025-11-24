import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";
import tableBottomIcon from "@/assets/svg-icons/table-bottom-icon.svg";


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
          // hasSubSidebar ? "ml-[262px]" : "ml-[72px]"
          hasSubSidebar ? "ml-[72px]" : "ml-[72px]"
        }`}
      >
        {/* Header */}
        <div className="sticky w-full top-0 z-50 bg-background">
          <Header title={title} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}

          {/* Spacer so content never hides behind footer */}
        </main>
  <div className="h-[55px]"></div>

        {/* Fixed Footer */}
<div className="fixed bottom-0 left-0 right-0 ml-[72px] h-[55px] bg-white flex items-center justify-end z-50 px-[16px]">
<div className="flex items-center justify-end gap-2 text-sm font-medium text-[#5C71B6]">
            <span>© 2025 Viper Desk. All Rights Reserved.</span>
            <img alt="tableBottomIcon" src={tableBottomIcon} />
          </div>
</div>
      </div>
    </div>
  );
};
