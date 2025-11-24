import CustomSelect from "@/components/CustomSelect";
import { AssetsMenuGroups } from "@/components/Layout/assets/AssetsMenu";
import AssetsSidebarGroup from "@/components/Layout/assets/AssetsSidebarGroup";
import AssetsSidebarItem from "@/components/Layout/assets/AssetsSidebarItem";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";

const AssetsSidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Toggle expand/collapse for any item
  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Recursive function to check if any nested item is active
  const hasActiveItem = (items: any[]): boolean => {
    return items.some(item => {
      const isActive = location.pathname.startsWith(item.path || '');
      const hasActiveChildren = item.items ? hasActiveItem(item.items) : false;
      return isActive || hasActiveChildren;
    });
  };

  // Determine which group should be open by default based on current path
  const getDefaultOpen = (groupId: string) => {
    const group = AssetsMenuGroups.find((g) => g.id === groupId);
    return group ? hasActiveItem(group.items) : false;
  };

  // Recursive function to render nested items with toggle functionality
  const renderNestedItems = (items: any[], level = 0, parentId = '') => {
    return items.map((item) => {
      const itemId = parentId ? `${parentId}-${item.id}` : item.id;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = expandedItems.has(itemId);

      return (
        <div key={itemId}>
          <AssetsSidebarItem
            icon={item.icon}
            title={item.title}
            path={item.path}
            level={level}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            onToggle={() => hasChildren && toggleItem(itemId)}
          />
          
          {/* Recursively render nested items if expanded */}
          {hasChildren && isExpanded && (
            <div className="ml-4">
              {renderNestedItems(item.items, level + 1, itemId)}
            </div>
          )}
        </div>
      );
    });
  };

  const { setValue } = useForm();
  
  return (
    <aside className="w-72 bg-gray-100 border-r border-sidebar-border sticky top-16 animate-slide-in overflow-y-auto ">
      <div className="px-4 pt-4 mb-2">
        <div className="w-[250px] relative">
          <CustomSelect
            options={[]}
            placeholder="Search"
            showNoneOption
            defaultValue={null}
            onChange={(option) => setValue("product", option?.id?.toString() || "")}
            className="w-full pr-8"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <nav className="px-4 space-y-4">
        {AssetsMenuGroups.map((group) => (
          <AssetsSidebarGroup
            key={group.id}
            title={group.title}
            defaultOpen={getDefaultOpen(group.id)}
          >
            {renderNestedItems(group.items)}
          </AssetsSidebarGroup>
        ))}
      </nav>
    </aside>
  );
};

export default AssetsSidebar;