import {
  Users,
  Shield,
  UserCog,
  Lock,
  Mail,
  Palette,
  FileText,
  Database,
  Laptop,
  Server,
  Cpu,
  HardDrive,
  Monitor
} from "lucide-react";

export const AssetsMenuGroups = [
  {
    id: "all",
    title: "All Assets",
    items: [
      {
        id: "assets1",
        title: "Assets",
        items: [
          {
            id: "IT",
            title: "IT",
            items: [
              {
                id: "access",
                title: "Access Point",
                path: "/assets/IT/access",
                icon: Database
              },
              {
                id: "computers",
                title: "Computers",
                // path: "/assets/all/assets1/NewAssets",
                items: [ // Nested items for Computers
                  {
                    id: "server",
                    title: "Servers",
                    path: "/assets/IT/computers/server",
                    icon: Monitor
                  },
                  {
                    id: "test2",
                    title: "test2", 
                    path: "/assets/IT/computers/test2",
                    icon: Laptop
                  },
                  {
                    id: "VH",
                    title: "Virtual Hosts",
                    path: "/assets/IT/computers/VH",
                    icon: Cpu
                  },
                    {
                    id: "VM",
                    title: "Virtual Machines",
                    path: "/assets/IT/computers/VM",
                    icon: Cpu
                  },
                    {
                    id: "work",
                    title: "Workstations",
                    path: "/assets/IT/computers/work",
                    icon: Cpu
                  },
                    {
                    id: "mobile",
                    title: "Mobile Devices",
                    path: "/assets/IT/computers/mobile",
                    icon: Cpu
                  },
                   {
                    id: "printer",
                    title: "Printers",
                    path: "/assets/IT/computers/printer",
                    icon: Cpu
                  },
                   {
                    id: "router",
                    title: "Routers",
                    path: "/assets/IT/computers/router",
                    icon: Cpu
                  },
                   {
                    id: "switch",
                    title: "Switches",
                    path: "/assets/IT/computers/switch",
                    icon: Cpu
                  }
                ]
              },
             
            ]
          },
          {
            id: "non-it",
            title: "Non-IT",
            path: "/assets/non-it",
            icon: HardDrive
          },
        ]
      },
      {
        id: "component",
        title: "Component"
      }
    ],
  },
  {
    id: "mobile-devices",
    title: "Mobile Devices",
    items: [
      {
        id: "requester",
        title: "Requester",
        path: "/setup/requester",
        icon: Users,
      },
      {
        id: "technician",
        title: "Technician",
        path: "/setup/technician",
        icon: Shield,
      },
      {
        id: "groups",
        title: "User Groups",
        path: "/setup/group",
        icon: UserCog,
      },
      {
        id: "roles",
        title: "Roles & Permissions",
        path: "/setup/roles",
        icon: Lock,
      },
    ],
  },
  {
    id: "non-it",
    title: "Non-IT",
    items: [
      {
        id: "helpdesk",
        title: "Helpdesk",
        path: "/setup/category",
        icon: Mail,
      },
    ],
  },
  {
    id: "Components",
    title: "Components",
    items: [
      {
        id: "servicelevelagreements",
        title: "Service Level Agreements",
        path: "/setup/sla",
        icon: Palette,
      },
    ],
  },
  {
    id: "consumeable",
    title: "Consumeable",
    items: [
      {
        id: "helpdesk",
        title: "Helpdesk",
        path: "/setup/category",
        icon: Mail,
      },
    ],
  },
  {
    id: "software",
    title: "Software",
    items: [
      {
        id: "helpdesk",
        title: "Helpdesk",
        path: "/setup/category",
        icon: Mail,
      },
    ],
  },
  {
    id: "assets-loan",
    title: "Assets Loan",
    items: [
      {
        id: "helpdesk",
        title: "Helpdesk",
        path: "/setup/category",
        icon: Mail,
      },
    ],
  },
];