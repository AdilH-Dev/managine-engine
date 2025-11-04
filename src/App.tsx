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
          <Route path="/setup" element={<Setup />} />
          <Route path="/setup/company" element={<Company />} />
          <Route path="/setup/site" element={<Site />} />
          <Route path="/setup/department" element={<Department />} />
          <Route path="/setup/group" element={<Group />} />
          <Route path="/setup/category" element={<Category />} />
          <Route path="/setup/sub-category" element={<SubCategory />} />
          <Route path="/setup/requester" element={<Requester />} />
          <Route path="/setup/technician" element={<Technician />} />
          <Route path="/setup/assets-type" element={<AssetsType />} />
          <Route path="/setup/assets" element={<Assets />} />
          <Route path="/setup/customer" element={<Customer />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/setup/priortymatrix" element={<PriorityMatrix/>}/>
          <Route path="/setup/requesttype" element={<RequestType/>} />
          <Route path="/setup/tasktype" element={<TaskType/>} />
          <Route path="/setup/worklogtype" element={<WorklogType/>} />
          <Route path="/setup/closurecode" element={<ClosureCode/>} />
          <Route path="/setup/sla" element={<ServiceLevelAgreements/>} />
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
       </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
