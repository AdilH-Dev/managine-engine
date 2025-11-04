import React from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import TabsNavbar from "@/components/common/TabsNavbar";

const Helpdesk = ({ children }: any) => {
  const tabs = [
    { name: "Category", path: "/setup/helpdesk/category" },
    { name: "Status", path: "/setup/helpdesk/status" },
    { name: "Level", path: "/setup/helpdesk/level" },
    { name: "Mode", path: "/setup/helpdesk/mode" },
    { name: "Impact", path: "/setup/helpdesk/impact" },
    { name: "Urgency", path: "/setup/helpdesk/urgency" },
    { name: "Priority", path: "/setup/helpdesk/priority" },
    { name: "Priority Matrix", path: "/setup/helpdesk/priority-matrix" },
    { name: "Request Type", path: "/setup/helpdesk/request-type" },
    { name: "Task Type", path: "/setup/helpdesk/task-type" },
    { name: "Worklog Type", path: "/setup/helpdesk/worklog-type" },
    { name: "Closure Code", path: "/setup/helpdesk/closure-code" },
  ];

  return (
    <MainLayout title="HelpDesk">
      <TabsNavbar tabs={tabs} />
      {children}
    </MainLayout>
  );
};

export default Helpdesk;
