// import React from "react";
// import { MainLayout } from "@/components/Layout/MainLayout";
import TabsNavbar from "@/components/common/TabsNavbar";

const Helpdesk = ({ children }: any) => {
  const tabs = [
    { name: "Category", path: "/setup/category" },
    { name: "Status", path: "/setup/status" },
    { name: "Level", path: "/setup/level" },
    { name: "Mode", path: "/setup/mode" },
    { name: "Impact", path: "/setup/impact" },
    { name: "Urgency", path: "/setup/urgency" },
    { name: "Priority", path: "/setup/priority" },
    { name: "Priority Matrix", path: "/setup/priority-matrix" },
    { name: "Request Type", path: "/setup/request-type" },
    { name: "Task Type", path: "/setup/task-type" },
    { name: "Worklog Type", path: "/setup/worklog-type" },
    { name: "Closure Code", path: "/setup/closure-code" },
  ];

  return (
    <>
      <TabsNavbar tabs={tabs} />
      {children}
    </>
  );
};

export default Helpdesk;
