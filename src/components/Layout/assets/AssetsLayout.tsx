import { Outlet } from "react-router-dom";
import AssetsSidebar from "@/components/Layout/assets/AssetsSidebar";
import { MainLayout } from "../MainLayout";

const AssetsLayout = () => {
  return (
    <MainLayout title="Setup">
      <div className="flex w-full h-full">
        <AssetsSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default AssetsLayout;
