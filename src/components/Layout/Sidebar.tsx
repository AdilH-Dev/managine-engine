import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/svg-icons/logo2.svg";
import dashboardIcon from "@/assets/svg-icons/dashboard-icon.svg";
import activitylogIcon from "@/assets/svg-icons/activity-log-icon.svg";
import requestIcon from "@/assets/svg-icons/request-icon.svg";
import problemIcon from "@/assets/svg-icons/problem-icon.svg";
import setupIcon from "@/assets/svg-icons/setup-icon.svg";
import notificationIcon from "@/assets/svg-icons/notification-icon.svg";
import permissionsIcon from "@/assets/svg-icons/permissions-icon.svg";

const menuItems = [
  { path: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
  { path: "/activity-log", icon: activitylogIcon, label: "Activity Log" },
  { path: "/requests", icon: requestIcon, label: "Requests" },
  { path: "/problems", icon: problemIcon, label: "Problems" },

  // Example parent with grouped children
  {
    path: "/setup",
    icon: setupIcon,
    label: "Setup",
    children: [
      {
        group: "Instance Configurations",
        items: [
          { path: "/setup/company", label: "Company" },
          { path: "/setup/regions", label: "Regions" },
          { path: "/setup/site", label: "Site" },
          { path: "/setup/department", label: "Department" },
        ],
      },
      {
        group: "Customization",
        items: [
          { path: "/setup/category", label: "Service Desk" },
          { path: "/setup/assets-type", label: "Asset Management" },
          { path: "/setup/sub-category", label: "Sub Category" },
          { path: "/setup/assets", label: "Assets" },
          { path: "/setup/helpdesk/category", label: "Helpdesk" },
        ],
      },
      {
        group: "User & Permissions",
        items: [
          { path: "/setup/group", label: "Group" },
          { path: "/setup/requester", label: "Requester" },
          { path: "/setup/technician", label: "Technician" },
          { path: "/setup/customer", label: "Customer" },
        ],
      },
      {
        group: "Automation",
        items: [
          { path: "/setup/assets-type", label: "Assets Type" },
          { path: "/setup/assets", label: "Assets" },
          { path: "/setup/new-assets", label: "NewAssets" },
          { path: "/setup/new-button", label: "NewButton" },
        ],
      },
    ],
  },

  { path: "/notification", icon: notificationIcon, label: "Notification" },
  { path: "/assets/new-assets", icon: permissionsIcon, label: "Assets" },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find which parent is active
  // const activeParent = menuItems.find((item) =>
  //   location.pathname.startsWith(item.path)
  // );

  // Handle parent click
  const handleParentClick = (item) => {
    if (item.children && item.children.length > 0) {
      // Find first child (even inside groups)
      const firstChild = item.children[0].items[0];
      navigate(firstChild.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="flex">
      {/* Main Sidebar */}
      <aside className="w-[72px] bg-sidebar-bg min-h-screen flex flex-col border-r border-sidebar-hover">
        <div className="h-[48px] border-b border-sidebar-hover flex justify-center items-center">
          <img src={Logo} alt="Logo" className="w-5 h-5" />
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleParentClick(item)}
                className={`w-full flex items-center gap-2 flex-col px-1 py-2 my-2 text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-active text-white"
                    : "text-gray-400 hover:bg-sidebar-hover hover:text-white"
                }`}
              >
                <img alt="" src={item.icon} className="w-4 h-4" />
                <span className="text-center text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Sub Sidebar */}
      {/* {activeParent?.children && (
        <aside className="w-48 bg-white border-r border-gray-200 min-h-screen p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            {activeParent.label}
          </h2>

          {activeParent.children.map((group, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                {group.group}
              </h3>
              <nav className="space-y-1">
                {group.items.map((child) => {
                  const isActive = location.pathname === child.path;
                  return (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block rounded px-3 py-2 text-sm ${
                        isActive
                          ? "bg-sidebar-active text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>
      )} */}
    </div>
  );
};
