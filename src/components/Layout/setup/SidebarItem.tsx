// import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
//   icon: LucideIcon;
  title: string;
  path: string;
  collapsed?: boolean;
  isNested?: boolean;
}

const SidebarItem = ({title, path, collapsed, isNested }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 transition-all",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-[#f1faff] text-[#4588f0]  border-l-4 border-[#4588f0]  font-medium hover:bg-[#f1faff]  hover:text-[#4588f0]",
          collapsed && "justify-center px-2",
          isNested && "pl-9"
        )
      }
    >
      {/* <Icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-6 w-6")} /> */}
      {!collapsed && <span className="text-sm truncate">{title}</span>}
    </NavLink>
  );
};

export default SidebarItem;
