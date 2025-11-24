import { LucideIcon, ChevronRight, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AssetsSidebarItemProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | string;
  title: string;
  path?: string;
  level?: number;
  hasChildren?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const AssetsSidebarItem = ({ 
  icon: Icon, 
  title, 
  path, 
  level = 0,
  hasChildren = false,
  isExpanded = false,
  onToggle
}: AssetsSidebarItemProps) => {
  const paddingLeft = 12 + (level * 16);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      onToggle?.();
    }
  };

  const renderIcon = () => {
    if (!Icon) return null;

    // If it's a string (SVG string)
    if (typeof Icon === 'string') {
      return (
        <div 
          className={cn(
            "h-4 w-4 flex-shrink-0",
            level > 0 && "h-3 w-3",
            hasChildren && "ml-4"
          )}
          dangerouslySetInnerHTML={{ __html: Icon }}
        />
      );
    }

    // If it's a component (Lucide icon or custom component)
    const IconComponent = Icon as React.ComponentType<{ className?: string }>;
    return (
      <IconComponent className={cn(
        "h-4 w-4 flex-shrink-0",
        level > 0 && "h-3 w-3",
        hasChildren && "ml-4"
      )} />
    );
  };

  return (
    <div className="relative">
      <NavLink
        to={path || "#"}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 py-2 transition-all rounded-md",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive && path 
              ? "bg-[#f1faff] text-[#4588f0] font-medium hover:bg-[#f1faff] hover:text-[#4588f0]" 
              : "text-sidebar-foreground",
            !path && hasChildren && "cursor-pointer",
            hasChildren && "pr-8"
          )
        }
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        )}

        {renderIcon()}
        
        <span className={cn(
          "text-sm truncate flex-1",
          level > 0 && "text-xs",
          !Icon && hasChildren && "ml-4"
        )}>
          {title}
        </span>
      </NavLink>
    </div>
  );
};

export default AssetsSidebarItem;