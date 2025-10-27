import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
// import { Paperclip } from "lucide-react";
import { useState } from "react";
// import ticketIconTrans from "@/assets/svg-icons/ticket-icon-trans.svg";
import attachmentIcons from "@/assets/svg-icons/attachment.svg";
import CustomSelect from "@/components/CustomSelect";

const AddTicket = () => {
  // Category → Sub-Category mapping
  const categories = [
    {
      value: "hardware",
      label: "Hardware",
      subCategories: [
        { value: "laptop", label: "Laptop" },
        { value: "desktop", label: "Desktop" },
        { value: "printer", label: "Printer" },
        { value: "scanner", label: "Scanner" },
        { value: "peripheral_device", label: "Peripheral Device" },
      ],
    },
    {
      value: "software",
      label: "Software",
      subCategories: [
        { value: "operating_system", label: "Operating System" },
        {
          value: "productivity_tools",
          label: "Productivity Tools (MS Office, Adobe)",
        },
        { value: "utility_software", label: "Utility Software" },
      ],
    },
    {
      value: "network",
      label: "Network",
      subCategories: [
        { value: "vpn_connectivity", label: "VPN Connectivity" },
        { value: "internet_lan", label: "Internet / LAN Issues" },
        { value: "switch_configuration", label: "Switch Configuration" },
        { value: "router_configuration", label: "Router Configuration" },
      ],
    },
    {
      value: "firewall_security",
      label: "Firewall & Security",
      subCategories: [
        { value: "intrusion_prevention", label: "Intrusion Prevention" },
        { value: "access_control", label: "Access Control" },
        {
          value: "antivirus_protection",
          label: "Antivirus / Endpoint Protection",
        },
      ],
    },
    {
      value: "email_communication",
      label: "Email & Communication",
      subCategories: [
        { value: "outlook_mail", label: "Outlook / Mail Client" },
        { value: "mail_server", label: "Mail Server Issues" },
        { value: "messaging_tools", label: "Messaging Tools (Teams, Slack)" },
      ],
    },
    {
      value: "database",
      label: "Database",
      subCategories: [
        { value: "sql_server", label: "SQL Server" },
        { value: "oracle_db", label: "Oracle DB" },
        { value: "backup_recovery", label: "Backup & Recovery" },
      ],
    },
    {
      value: "application",
      label: "Application",
      subCategories: [
        { value: "erp_system", label: "ERP System" },
        { value: "crm_application", label: "CRM Application" },
        { value: "custom_apps", label: "Custom In-house Apps" },
      ],
    },
    {
      value: "server",
      label: "Server",
      subCategories: [
        { value: "web_server", label: "Web Server" },
        { value: "application_server", label: "Application Server" },
        { value: "file_server", label: "File Server" },
      ],
    },
    {
      value: "storage",
      label: "Storage",
      subCategories: [
        { value: "backup_system", label: "Backup System" },
        { value: "san_nas", label: "SAN/NAS Issues" },
        { value: "cloud_storage", label: "Cloud Storage" },
      ],
    },
    {
      value: "cloud_services",
      label: "Cloud Services",
      subCategories: [
        { value: "office_365", label: "Office 365" },
        { value: "google_workspace", label: "Google Workspace" },
        { value: "aws_services", label: "AWS Services" },
        { value: "azure_services", label: "Azure Services" },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const requestTypes = [
    { label: "Incident", value: "incident" },
    { label: "Service Request", value: "service_request" },
    { label: "Change Request", value: "change_request" },
    { label: "Access Request", value: "access_request" },
    { label: "General Inquiry", value: "general_inquiry" },
  ];

  const requesterOptions = [
  { label: "John Doe", value: "john_doe" },
  { label: "Jane Smith", value: "jane_smith" },
  { label: "Michael Johnson", value: "michael_johnson" },
  { label: "Emily Davis", value: "emily_davis" },
  { label: "Chris Brown", value: "chris_brown" },
];

const requestTypeOptions = [
  { label: "Incident", value: "incident" },
  { label: "Service Request", value: "service_request" },
  { label: "Change Request", value: "change_request" },
  { label: "Access Request", value: "access_request" },
  { label: "General Inquiry", value: "general_inquiry" },
];

const impactOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "Minimal", value: "minimal" },
];

const modeOptions = [
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Portal", value: "portal" },
  { label: "Walk-in", value: "walk_in" },
  { label: "Chat", value: "chat" },
];

const levelOptions = [
  { label: "Level 1", value: "level_1" },
  { label: "Level 2", value: "level_2" },
  { label: "Level 3", value: "level_3" },
  { label: "Level 4", value: "level_4" },
];

const siteOptions = [
  { label: "Head Office", value: "head_office" },
  { label: "Branch Office", value: "branch_office" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Remote Site", value: "remote_site" },
];

const groupOptions = [
  { label: "IT Support", value: "it_support" },
  { label: "Network Team", value: "network_team" },
  { label: "Software Team", value: "software_team" },
  { label: "Hardware Team", value: "hardware_team" },
  { label: "Security Team", value: "security_team" },
];

const technicianOptions = [
  { label: "Alice Cooper", value: "alice_cooper" },
  { label: "Bob Lee", value: "bob_lee" },
  { label: "Charlie Kim", value: "charlie_kim" },
  { label: "David Park", value: "david_park" },
  { label: "Ella Chen", value: "ella_chen" },
];

const priorityOptions = [
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
  { label: "Pending", value: "pending" },
];

const assetOptions = [
  { label: "Laptop - Dell XPS 13", value: "dell_xps_13" },
  { label: "Desktop - HP EliteDesk", value: "hp_elitedesk" },
  { label: "Printer - Canon LBP2900", value: "canon_lbp2900" },
  { label: "Monitor - Samsung 24\"", value: "samsung_24" },
  { label: "Router - Cisco 2901", value: "cisco_2901" },
];

  const handleSelectChange = (option) => {
    console.log("Selected:", option);
  };

  return (
    <MainLayout title="Add Request">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Add Request
        </h2>
      </div>
      <Card className="px-6 border-none rounded-none">
        <div className="bg-background p-[30px] border-primary rounded border">
          {/* <div className="flex items-center mb-3">
            <img alt="ticketIconTrans" src={ticketIconTrans} />
            <span className="text-primary ms-3 mb-0">Add Request</span>
          </div> */}

          <div className="mb-6 bg-white p-[16px]">
            {/* Requester Details */}
            <div className="mb-6">
              <div className="bg-[#31456C] text-white px-4 py-2 font-semibold mb-4">
                Requester Details
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* <div>
                  <Label>Company*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summit">Summit Innovations</SelectItem>
                      <SelectItem value="bluewave">
                        BlueWave Technologies
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div>
                  <Label>Requester*</Label>
                  <CustomSelect
                    options={requesterOptions}
                    placeholder="-- Select Requester --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Employee ID</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
                <div>
                  <Label>Site</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
                <div>
                  <Label>Job Title</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div>
              <div className="bg-[#31456C] text-white px-4 py-2 font-semibold mb-4">
                Ticket Details
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Subject*</Label>
                  <Input placeholder="Enter Subject" />
                </div>
                <div>
                  <Label>Request Type</Label>
                  <CustomSelect
                    options={requestTypes}
                    placeholder="-- Select Request Type --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Impact</Label>
                   <CustomSelect
                    options={impactOptions}
                    placeholder="-- Select Impact --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Mode</Label>
                  <CustomSelect
                    options={modeOptions}
                    placeholder="-- Select Mode --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <CustomSelect
                    options={levelOptions}
                    placeholder="-- Select Level --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Site</Label>
                   <CustomSelect
                    options={siteOptions}
                    placeholder="-- Select Site --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Group</Label>
                   <CustomSelect
                    options={groupOptions}
                    placeholder="-- Select Group --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                   <CustomSelect
                    options={categories}
                    placeholder="-- Select Category --"
                    onChange={(item)=>{setSelectedCategory(item.value)}}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Sub-Category</Label>
                   <CustomSelect
                    options={selectedCategory &&
                        categories
                          .find((cat) => cat.value === selectedCategory)?.subCategories || []}
                    placeholder="-- Select Sub-Category --"
                    onChange={(item)=>{setSelectedCategory(item.value)}}
                    showNoneOption={true}
                  />
                </div>

                <div>
                  <Label>Technician</Label>
                  <CustomSelect
                    options={technicianOptions}
                    placeholder="-- Select Technician --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <CustomSelect
                    options={priorityOptions}
                    placeholder="-- Select Priority --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <CustomSelect
                    options={statusOptions}
                    placeholder="-- Select Status --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div>
                  <Label>Completed</Label>
                  <Input placeholder="Enter Percentage" />
                </div>
                <div>
                  <Label>Asset</Label>
                  <CustomSelect
                    options={assetOptions}
                    placeholder="-- Select Asset --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div className="">
                  <Label>Notify By</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="email" defaultChecked />
                      <label htmlFor="email" className="text-sm">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="sms" />
                      <label htmlFor="sms" className="text-sm">
                        SMS
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="whatsapp" />
                      <label htmlFor="whatsapp" className="text-sm">
                        Whatsapp
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Notify these by Email</Label>
                  <CustomSelect
                    options={requesterOptions}
                    placeholder="-- Select Notify --"
                    onChange={handleSelectChange}
                    showNoneOption={true}
                  />
                </div>
                <div></div>
                {/* <div className="col-span-3">
                <Label>Attachments</Label>
                <Button variant="outline" className="mt-2">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
              </div> */}
                <Label>Attachments</Label>
                <div className="col-span-3 bg-[#FAFAFA] w-full border border-dashed border-gray-300 rounded-md flex items-center justify-between px-4 py-2">
                  <label
                    htmlFor="file-upload"
                    className="text-sm text-gray-500 cursor-pointer flex-1"
                  >
                    Choose file to upload
                  </label>

                  <input id="file-upload" type="file" className="hidden" />

                  <label
                    htmlFor="file-upload"
                    className="bg-[#464D9B] w-[120px] text-white text-sm px-4 py-1.5 rounded-md cursor-pointer flex items-center gap-1 hover:bg-[#3b4389] transition"
                  >
                    <img alt="" src={attachmentIcons} />
                    Attach File
                  </label>
                </div>
                <div className="col-span-3">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter Description"
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" className="w-[140px] h-[44px]">
                Cancel
              </Button>
              <Button className="bg-primary w-[140px] h-[44px]">Add</Button>
            </div>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default AddTicket;
