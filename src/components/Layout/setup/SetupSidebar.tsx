import { setupMenuGroups } from "@/components/Layout/setup/setupMenu";
import SidebarGroup from "@/components/Layout/setup/SidebarGroup";
import SidebarItem from "@/components/Layout/setup/SidebarItem";
import { useLocation } from "react-router-dom";

const SetupSidebar = () => {
  const location = useLocation();

  // Determine which group should be open by default based on current path
  const getDefaultOpen = (groupId: string) => {
    const currentPath = location.pathname;
    const group = setupMenuGroups.find((g) => g.id === groupId);
    return group?.items.some((item) => currentPath.startsWith(item.path)) ?? false;
  };

  return (
    // h-screen overflow-y-auto
    <aside className="w-60 bg-white border-r border-sidebar-border  sticky top-16  animate-slide-in">
      <div className="px-4 pt-4 mb-2">
        <h2 className="text-[20px] font-bold text-[#4588f0]">Setup</h2>
        {/* <p className="text-xs text-muted-foreground mt-1">
          Configure your system settings
        </p> */}
      </div>

      <nav className="px-4 space-y-4">
        {setupMenuGroups.map((group) => (
          <SidebarGroup
            key={group.id}
            title={group.title}
            defaultOpen={getDefaultOpen(group.id)}
          >
            {group.items.map((item) => (
              <SidebarItem
                key={item.id}
                // icon={item.icon}
                title={item.title}
                path={item.path}
              />
            ))}
          </SidebarGroup>
        ))}
      </nav>
    </aside>
  );
};

export default SetupSidebar;
