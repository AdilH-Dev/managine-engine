import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import companyIcon from "@/assets/svg-icons/company-icon.svg";
import siteIcon from "@/assets/svg-icons/site-icon.svg";
import departmentIcon from "@/assets/svg-icons/department-icon.svg";
import groupIcon from "@/assets/svg-icons/group-icon.svg";
import categoryIcon from "@/assets/svg-icons/category-icon.svg";
import subCategoryIcon from "@/assets/svg-icons/sub-category-icon.svg";
import requestorIcon from "@/assets/svg-icons/requestor-icon.svg";
import technicianIcon from "@/assets/svg-icons/technician-icon.svg";
import assetTypeIcon from "@/assets/svg-icons/asset-type-icon.svg";
import assetIcon from "@/assets/svg-icons/asset-icon.svg";
import slaIcon from "@/assets/svg-icons/sla-icon.svg";
import customerIcon from "@/assets/svg-icons/customer-icon.svg";



const setupItems = [
  { icon: companyIcon, title: "Company", description: "Manage client companies", count: 5, color: "bg-[#19AC4F]", route: "/setup/company" },
  { icon: siteIcon, title: "Site", description: "Manage company sites", count: 5, color: "bg-[#973AED]", route: "/setup/site" },
  { icon: departmentIcon, title: "Department", description: "Manage organization departments", count: 5, color: "bg-[#2B6CEE]", route: "/setup/department" },
  { icon: groupIcon, title: "Group", description: "Manage organization groups", count: 5, color: "bg-[#ED5E0E]", route: "/setup/group" },
  { icon: categoryIcon, title: "Category", description: "Manage organization categories", count: 5, color: "bg-[#2B6CEE]", route: "/setup/category" },
  { icon: subCategoryIcon, title: "Sub Category", description: "Manage organization sub categories", count: 5, color: "bg-[#19AC4F]", route: "/setup/sub-category" },
  { icon: requestorIcon, title: "Requester", description: "Manage organization requester", count: 5, color: "bg-[#ED5E0E]", route: "/setup/requester" },
  { icon: technicianIcon, title: "Technician", description: "Manage organization technician", count: 5, color: "bg-[#973AED]", route: "/setup/technician" },
  { icon: assetTypeIcon, title: "Assets Type", description: "Manage asset type", count: 5, color: "bg-[#ED5E0E]", route: "/setup/assets-type" },
  { icon: assetIcon, title: "Assets", description: "Manage organization assets", count: 5, color: "bg-[#973AED]", route: "/setup/assets" },
  { icon: slaIcon, title: "SLA", description: "Manage service level agreements", count: 5, color: "bg-[#19AC4F]", route: "/sla" },
  { icon: customerIcon, title: "Customer", description: "Manage organization customers", count: 5, color: "bg-[#19AC4F]", route: "/setup/customer" },

];

const Setup = () => {
  const navigate = useNavigate();

  return (
    <MainLayout title="Setup">
        {/* <h2 className="text-lg font-semibold mb-6">Setup</h2> */}
        <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Setup
        </h2>
      </div>
      <Card className="p-6 border-none rounded-none">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {setupItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index} 
                className="p-5 hover:shadow-[0px_0px_4px_0px_#00000040] cursor-pointer bg-white" 
                onClick={() => item.route && navigate(item.route)}
              >
                <div className="flex flex-col">
                  <div className={`w-[34px] h-[34px] ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                    {/* <Icon className="w-6 h-6 text-white" /> */}
                    <img src={item.icon} alt={item.title} className="w-[20px] h-[20px] text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-1 text-[14px]">{item.title}</h3>
                  <p className="text-[12px] text-[#8C8C8C]">{item.description}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[12px] text-[#C3C3C3]">{item.count} Items</span>
                    <span className="text-[12px] text-[#0088FF] cursor-pointer hover:underline">View All</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </MainLayout>
  );
};

export default Setup;
