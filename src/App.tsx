import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityLog from "./pages/ActivityLog";
import Requests from "./pages/requests/Requests";
import RequestDetail from "./pages/requests/RequestDetail";
import AddRequest from "./pages/requests/AddRequest";
import Setup from "./pages/setup/Setup";
import Company from "./pages/setup/Company";
import Site from "./pages/setup/Site";
import AddSite from "./pages/setup/AddSite";
import Department from "./pages/setup/Department";
import Group from "./pages/setup/Group";
import Category from "./pages/setup/Category";
import SubCategory from "./pages/setup/SubCategory";
import Requester from "./pages/setup/Requester";
import Technician from "./pages/setup/Technician";
import Assets from "./pages/setup/Assets";
import Roles from "./pages/roles-permissions/Roles";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth-pages/login";
import AssetsType from "./pages/setup/AssetsType";
import Customer from "./pages/setup/Customer";
import Notification from "./pages/notifications/Notification";
import Dashboard from "./pages/dashboard/Dashboard";
import RequestType from "./pages/setup/RequestType";
import TaskType from "./pages/setup/TaskType";
import WorklogType from "./pages/setup/WorklogType";
import ClosureCode from "./pages/setup/ClosureCode";
import PriorityMatrix from "./pages/setup/PriortyMatrix";
import { AuthProvider } from "@/contexts/AuthContext";
import ServiceLevelAgreements from "./pages/setup/ServiceLevelAgreements";
import SetupLayout from "./components/Layout/setup/SetupLayout";
import Status from "./pages/setup/Status";
import Level from "./pages/setup/Level";
import Mode from "./pages/setup/Mode";
import Impact from "./pages/setup/Impact";
import Urgency from "./pages/setup/Urgency";
import Priority from "./pages/setup/Priority";
import NewAssets from "./pages/setup/assets/NewAssets";
import NewButton from "./pages/setup/assets/NewButton";
import Regions from "./pages/setup/Regions";
import AssetsLayout from "./components/Layout/assets/AssetsLayout";
import IncidentTemplates from "./pages/setup/template-form/IncidentTemplates";
import IncidentTemplatesAdd from "./pages/setup/template-form/IncidentTemplatesAdd";
import IncidentTemplateA from "./pages/setup/template-form/IncidentTemplateA";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { RoleBasedRoute } from "@/components/RoleBasedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activity-log" element={<ActivityLog />} />
            {/* <Route path="/tickets" element={<Tickets />} /> */}
            <Route path="/requests" element={<Requests />} />
            <Route path="/problems" element={<Requests />} />
            <Route path="/request/:id" element={<RequestDetail />} />
            <Route path="/add-ticket" element={<AddRequest />} />
            <Route path="/setup" element={<SetupLayout />}>
              <Route path="setup" element={<Setup />} />
              <Route path="company" element={<Company />} />
              <Route path="regions" element={<Regions />} />
              <Route path="site" element={<Site />} />
               <Route path="/setup/add-site" element={<AddSite />} />
              <Route path="department" element={<Department />} />
              <Route path="requester" element={<Requester />} />
              <Route path="technician" element={<Technician />} />
              <Route path="group" element={<Group />} />
              <Route path="category" element={<Category />} />
              <Route path="status" element={<Status />} />
              <Route path="level" element={<Level />} />
              <Route path="mode" element={<Mode />} />
              <Route path="impact" element={<Impact />} />
              <Route path="urgency" element={<Urgency />} />
              <Route path="priority" element={<Priority />} />
              <Route path="priority-matrix" element={<PriorityMatrix />} />
              <Route path="request-type" element={<RequestType />} />
              <Route path="task-type" element={<TaskType />} />
              <Route path="worklog-type" element={<WorklogType />} />
              <Route path="closure-code" element={<ClosureCode />} />
              <Route path="roles" element={<Roles />} />
              <Route path="sla" element={<ServiceLevelAgreements />} />
              <Route path="incident-templates" element={<IncidentTemplates />} />
              <Route path="incident-templates/ad" element={<IncidentTemplateA />} />
              <Route path="incident-templates/add" element={<IncidentTemplatesAdd />} />
            </Route>
            <Route path="/setup/sub-category" element={<SubCategory />} />
            <Route path="/setup/assets-type" element={<AssetsType />} />
            <Route path="/setup/assets" element={<Assets />} />
            <Route path="/setup/customer" element={<Customer />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/assets" element={<AssetsLayout />}>
            <Route path="new-assets" element={<NewAssets />} />
            </Route>
            <Route path="/assets/new-button" element={<NewButton />} />
            

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
