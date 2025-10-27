import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ActivityLog from "./pages/ActivityLog";
import Requests from "./pages/Requests";
import TicketDetail from "./pages/TicketDetail";
import AddTicket from "./pages/AddTicket";
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
import Notification from "./pages/Notification";
import Roles from "./pages/Roles";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth-pages/login";
import AssetsType from "./pages/setup/AssetsType";
import Customer from "./pages/setup/Customer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          {/* <Route path="/tickets" element={<Tickets />} /> */}
          <Route path="/requests" element={<Requests />} />
          <Route path="/problems" element={<Requests />} />
          <Route path="/request/:id" element={<TicketDetail />} />
          <Route path="/add-ticket" element={<AddTicket />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
