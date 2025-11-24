import { Outlet } from "react-router-dom";
import SetupSidebar from "@/components/Layout/setup/SetupSidebar";
import { MainLayout } from "../MainLayout";

const SetupLayout = () => {
  return (
    <MainLayout title="Setup">
      <div className="flex w-full h-full">
        <SetupSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default SetupLayout;
