import {
  Users,
  Shield,
  UserCog,
  Lock,
  Mail,
  Palette,
  FileText,
  Database,
} from "lucide-react";

export const setupMenuGroups = [
  {
    id: "instance",
    title: "Instance Configurations",
    items: [
      {
        id: "company",
        title: "Company",
        path: "/setup/company",
        // icon: Database,
      },
      {
        id: "regions",
        title: "Regions",
        path: "/setup/regions",
        // icon: Database,
      },
      {
        id: "site",
        title: "Site",
        path: "/setup/site",
        // icon: Database,
      },
      {
        id: "department",
        title: "Department",
        path: "/setup/department",
        // icon: Database,
      },
    ],
  },
  {
    id: "users-permissions",
    title: "Users & Permissions",
    items: [
      {
        id: "requester",
        title: "Requester",
        path: "/setup/requester",
        // icon: Users,
      },
      {
        id: "technician",
        title: "Technician",
        path: "/setup/technician",
        // icon: Shield,
      },
      {
        id: "groups",
        title: "User Groups",
        path: "/setup/group",
        // icon: UserCog,
      },
      {
        id: "roles",
        title: "Roles & Permissions",
        path: "/setup/roles",
        // icon: Lock,
      },
    ],
  },
  {
    id: "customization",
    title: "Customization",
    items: [
      {
        id: "helpdesk",
        title: "Helpdesk",
        path: "/setup/category",
        // icon: Mail,
      },
    ],
  },
  {
    id: "templates-forms",
    title: "Templates & Forms",
    items: [
      {
        id: "incidenttemplates",
        title: "Incident Templates",
        path: "/setup/incident-templates",
        // icon: Mail,
      },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    items: [
      {
        id: "servicelevelagreements",
        title: "Service Level Agreements",
        path: "/setup/sla",
        // icon: Palette,
      },
      //   {
      //     id: "templates",
      //     title: "Templates & Forms",
      //     path: "/setup/templates",
      //     icon: FileText,
      //   },
    ],
  },
];
