import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";

const Roles = () => {
  return (
    <MainLayout title="Roles & Permissions">
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Roles & Permissions</h2>
        <p className="text-gray-500">Configure user roles and permissions here</p>
      </Card>
    </MainLayout>
  );
};

export default Roles;
