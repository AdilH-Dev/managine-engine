import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
// import { Paperclip } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
// import ticketIconTrans from "@/assets/svg-icons/ticket-icon-trans.svg";
import attachmentIcons from "@/assets/svg-icons/attachment.svg";
import CustomSelect from "@/components/CustomSelect";
import { ChevronLeft } from "lucide-react";
import userIcon from "@/assets/svg-icons/user-icon.svg";

// -----------------------
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ticketFormSchema, type TicketFormSchema } from "@/lib/validation";
import { ticketService } from "@/services/ticketService";
import { DropdownData } from "@/types/ticket";
// import { FileUpload } from "./FileUpload";
// import { RichTextEditor } from "./RichTextEditor";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
// import { FileUpload } from "@/components/tickets/FileUpload";
import { InputFile } from "@/components/tickets/InputFile";
// import { get } from "http";

// interface TicketFormProps {
//   ticket?: Ticket;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Requester from "../setup/Requester";
import { AttachmentFilenames } from "@/components/tickets/AttachmentFilenames";

const AddRequest = () => {
  const ticket = null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log("Ticket ID:", id);
  // Category → Sub-Category mapping
  // const categories = [
  //   {
  //     value: "hardware",
  //     label: "Hardware",
  //     subCategories: [
  //       { value: "laptop", label: "Laptop" },
  //       { value: "desktop", label: "Desktop" },
  //       { value: "printer", label: "Printer" },
  //       { value: "scanner", label: "Scanner" },
  //       { value: "peripheral_device", label: "Peripheral Device" },
  //     ],
  //   },
  //   {
  //     value: "software",
  //     label: "Software",
  //     subCategories: [
  //       { value: "operating_system", label: "Operating System" },
  //       {
  //         value: "productivity_tools",
  //         label: "Productivity Tools (MS Office, Adobe)",
  //       },
  //       { value: "utility_software", label: "Utility Software" },
  //     ],
  //   },
  //   {
  //     value: "network",
  //     label: "Network",
  //     subCategories: [
  //       { value: "vpn_connectivity", label: "VPN Connectivity" },
  //       { value: "internet_lan", label: "Internet / LAN Issues" },
  //       { value: "switch_configuration", label: "Switch Configuration" },
  //       { value: "router_configuration", label: "Router Configuration" },
  //     ],
  //   },
  //   {
  //     value: "firewall_security",
  //     label: "Firewall & Security",
  //     subCategories: [
  //       { value: "intrusion_prevention", label: "Intrusion Prevention" },
  //       { value: "access_control", label: "Access Control" },
  //       {
  //         value: "antivirus_protection",
  //         label: "Antivirus / Endpoint Protection",
  //       },
  //     ],
  //   },
  //   {
  //     value: "email_communication",
  //     label: "Email & Communication",
  //     subCategories: [
  //       { value: "outlook_mail", label: "Outlook / Mail Client" },
  //       { value: "mail_server", label: "Mail Server Issues" },
  //       { value: "messaging_tools", label: "Messaging Tools (Teams, Slack)" },
  //     ],
  //   },
  //   {
  //     value: "database",
  //     label: "Database",
  //     subCategories: [
  //       { value: "sql_server", label: "SQL Server" },
  //       { value: "oracle_db", label: "Oracle DB" },
  //       { value: "backup_recovery", label: "Backup & Recovery" },
  //     ],
  //   },
  //   {
  //     value: "application",
  //     label: "Application",
  //     subCategories: [
  //       { value: "erp_system", label: "ERP System" },
  //       { value: "crm_application", label: "CRM Application" },
  //       { value: "custom_apps", label: "Custom In-house Apps" },
  //     ],
  //   },
  //   {
  //     value: "server",
  //     label: "Server",
  //     subCategories: [
  //       { value: "web_server", label: "Web Server" },
  //       { value: "application_server", label: "Application Server" },
  //       { value: "file_server", label: "File Server" },
  //     ],
  //   },
  //   {
  //     value: "storage",
  //     label: "Storage",
  //     subCategories: [
  //       { value: "backup_system", label: "Backup System" },
  //       { value: "san_nas", label: "SAN/NAS Issues" },
  //       { value: "cloud_storage", label: "Cloud Storage" },
  //     ],
  //   },
  //   {
  //     value: "cloud_services",
  //     label: "Cloud Services",
  //     subCategories: [
  //       { value: "office_365", label: "Office 365" },
  //       { value: "google_workspace", label: "Google Workspace" },
  //       { value: "aws_services", label: "AWS Services" },
  //       { value: "azure_services", label: "Azure Services" },
  //     ],
  //   },
  // ];

  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // const requestTypes = [
  //   { label: "Incident", value: "incident" },
  //   { label: "Service Request", value: "service_request" },
  //   { label: "Change Request", value: "change_request" },
  //   { label: "Access Request", value: "access_request" },
  //   { label: "General Inquiry", value: "general_inquiry" },
  // ];

  // const requesterOptions = [
  //   { label: "John Doe", value: "john_doe" },
  //   { label: "Jane Smith", value: "jane_smith" },
  //   { label: "Michael Johnson", value: "michael_johnson" },
  //   { label: "Emily Davis", value: "emily_davis" },
  //   { label: "Chris Brown", value: "chris_brown" },
  // ];

  // const requestTypeOptions = [
  //   { label: "Incident", value: "incident" },
  //   { label: "Service Request", value: "service_request" },
  //   { label: "Change Request", value: "change_request" },
  //   { label: "Access Request", value: "access_request" },
  //   { label: "General Inquiry", value: "general_inquiry" },
  // ];

  // const impactOptions = [
  //   { label: "High", value: "high" },
  //   { label: "Medium", value: "medium" },
  //   { label: "Low", value: "low" },
  //   { label: "Minimal", value: "minimal" },
  // ];

  // const modeOptions = [
  //   { label: "Phone", value: "phone" },
  //   { label: "Email", value: "email" },
  //   { label: "Portal", value: "portal" },
  //   { label: "Walk-in", value: "walk_in" },
  //   { label: "Chat", value: "chat" },
  // ];

  // const levelOptions = [
  //   { label: "Level 1", value: "level_1" },
  //   { label: "Level 2", value: "level_2" },
  //   { label: "Level 3", value: "level_3" },
  //   { label: "Level 4", value: "level_4" },
  // ];

  // const siteOptions = [
  //   { label: "Head Office", value: "head_office" },
  //   { label: "Branch Office", value: "branch_office" },
  //   { label: "Warehouse", value: "warehouse" },
  //   { label: "Remote Site", value: "remote_site" },
  // ];

  // const groupOptions = [
  //   { label: "IT Support", value: "it_support" },
  //   { label: "Network Team", value: "network_team" },
  //   { label: "Software Team", value: "software_team" },
  //   { label: "Hardware Team", value: "hardware_team" },
  //   { label: "Security Team", value: "security_team" },
  // ];

  // const technicianOptions = [
  //   { label: "Alice Cooper", value: "alice_cooper" },
  //   { label: "Bob Lee", value: "bob_lee" },
  //   { label: "Charlie Kim", value: "charlie_kim" },
  //   { label: "David Park", value: "david_park" },
  //   { label: "Ella Chen", value: "ella_chen" },
  // ];

  // const priorityOptions = [
  //   { label: "Critical", value: "critical" },
  //   { label: "High", value: "high" },
  //   { label: "Medium", value: "medium" },
  //   { label: "Low", value: "low" },
  // ];

  // const statusOptions = [
  //   { label: "Open", value: "open" },
  //   { label: "In Progress", value: "in_progress" },
  //   { label: "Resolved", value: "resolved" },
  //   { label: "Closed", value: "closed" },
  //   { label: "Pending", value: "pending" },
  // ];

  // const assetOptions = [
  //   { label: "Laptop - Dell XPS 13", value: "dell_xps_13" },
  //   { label: "Desktop - HP EliteDesk", value: "hp_elitedesk" },
  //   { label: "Printer - Canon LBP2900", value: "canon_lbp2900" },
  //   { label: 'Monitor - Samsung 24"', value: "samsung_24" },
  //   { label: "Router - Cisco 2901", value: "cisco_2901" },
  // ];

  // const handleSelectChange = (option) => {
  //   console.log("Selected:", option);
  // };

  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState<DropdownData | null>(null);

  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<TicketFormSchema>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      requested_by: ticket?.requesterId || "",
      asset_id: ticket?.requesterId || "",
      subject: ticket?.subject || "",
      request_type_id: ticket?.request_type_id || "",
      impact_id: ticket?.impact_id || "",
      mode_id: ticket?.mode_id || "",
      level_id: ticket?.level_id || "",
      site_id: ticket?.site_id || "",
      group_id: ticket?.group_id || "",
      category_id: ticket?.category_id || "",
      sub_category_id: ticket?.sub_category_id || "",
      assigned_to: ticket?.technicianId || "",
      priority_id: ticket?.priority_id || "",
      status_id: ticket?.status_id || "",
      completed: ticket?.completed || "",
      notify_by: ticket?.notify_by || 1,
      notify_emails: ticket?.notify_emails || "",
      description: ticket?.description || "",
      attachments: ticket?.attachments || [],
      // attachment_filenames:ticket?.attachments || []
    },
  });

  console.log(errors, "errorserrorserrors");
  console.log(getValues(), "getValuesgetValues");

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const [dropDownData] = await Promise.all([ticketService.getDropdown("")]);
      console.log(dropDownData?.data, "dropDownDatadropDownData");
      setDropDown(dropDownData?.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  const categoryId = watch("category_id");
  const [subCatDropDownData, setSubCatDropDownData] = useState([]);

  useEffect(() => {
    if (categoryId) {
      getSubCatData(categoryId);
    } else {
      setSubCatDropDownData([]); // reset if no category selected
    }
  }, [categoryId]);

  const getSubCatData = async (catId?: string | number) => {
    try {
      const [dropDownData] = await Promise.all([
        ticketService.getSubCatDropdown(catId || ""),
      ]);
      console.log(dropDownData?.data, "SubCategory Data");
      setSubCatDropDownData(dropDownData?.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load subcategories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (id) {
      loadTicketData(id);
    }
  }, [id]);

  const loadTicketData = async (ticketId) => {
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const res = await ticketService.getTicket(ticketId);
      console.log(res, "resresresresresresres");
      if (res?.success) {
        const ticket = res.data;
        reset({
          requested_by: ticket.requested_by ? String(ticket.requested_by) : "",
          asset_id: ticket.asset_id ? String(ticket.asset_id) : "",
          subject: ticket.subject || "",
          request_type_id: ticket.request_type_id
            ? String(ticket.request_type_id)
            : "",
          impact_id: ticket.impact_id ? String(ticket.impact_id) : "",
          mode_id: ticket.mode_id ? String(ticket.mode_id) : "",
          level_id: ticket.level_id ? String(ticket.level_id) : "",
          site_id: ticket.site_id ? String(ticket.site_id) : "",
          group_id: ticket.group_id ? String(ticket.group_id) : "",
          category_id: ticket.category_id ? String(ticket.category_id) : "",
          sub_category_id: ticket.sub_category_id
            ? String(ticket.sub_category_id)
            : "",
          assigned_to: ticket.assigned_to ? String(ticket.assigned_to) : "",
          due_date: ticket.due_date ?  ticket.due_date : "",
          priority_id: ticket.priority_id ? String(ticket.priority_id) : "",
          status_id: ticket.status_id ? String(ticket.status_id) : "",
          completed: ticket.completed || "",
          notify_by: ticket.notify_by || 1,
          notify_emails: ticket.notifyEmails?.[0]?.email || "",
          description: ticket.description || "",
          attachment_filenames: ticket.attachments || [],
        });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: TicketFormSchema) => {
    console.log(data, "datainngngngngn");
    setLoading(true);
    const filenames = data?.attachment_filenames?.length
      ? data.attachment_filenames.map((item) => item?.file_name).join(",")
      : "";
    try {
      const formData: any = {
        ...data,
        company_id: "1",
        ...(id ? { attachment_filenames: filenames } : {}),
      };

      if (id) {
        const res = await ticketService.updateTicket(id, formData);
        console.log("updating ticket...", res, res);
        if (res?.success) {
          // toast({
          //   title: "Success",
          //   description: "Ticket created successfully",
          // });
          navigate("/requests");
          toast({
            title: "Success",
            description: "Ticket updated successfully",
          });
        }
      } else {
        const res = await ticketService.createTicket(formData);
        if (res?.success) {
          navigate("/requests");
          toast({
            title: "Success",
            description: "Ticket created successfully",
          });
        }
      }
      // onSuccess();
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: id ? "Failed to update ticket" : "Failed to create ticket",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };
  const [requesterOpen, setRequesterOpen] = useState(false);

  // const { watch } = useFormContext(); // or useForm if this is your main form

  // Reactively watch requested_by
  const requestedById = watch("requested_by");

  // Find requester info dynamically
  const requesterData = useMemo(() => {
    return dropDown?.requesters?.find((r) => r.id == requestedById) || null;
  }, [dropDown?.requesters, requestedById]);

  console.log(requesterData, "requesterDatarequesterData");

  const filenames = watch("attachment_filenames");

  return (
    <MainLayout title="Add Request">
      <div className="border-b bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center ">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="h-6 w-6 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          {id ? "Update" : "Add"} Request
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-none rounded-none">
          <div className="">
            <div className="mb-6 bg-white p-[15px]">
              {/* Requester Details */}
              <div className="pb-6 border-b p-[15px]">
                <div className="py-2 font-semibold mb-4">Requester Details</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <Label htmlFor="requested_by">
                      Requester*
                      {errors.requested_by && (
                        <span className="text-sm text-destructive mt-1 font-normal">
                          {errors.requested_by.message}
                        </span>
                      )}
                    </Label>
                    <div>
                      <Controller
                        name="requested_by"
                        control={control}
                        render={({ field }) => (
                          <div>
                            <CustomSelect
                              {...field}
                              options={dropDown?.requesters || []}
                              placeholder="-- Select Requester --"
                              showNoneOption
                              defaultValue={
                                dropDown?.requesters?.find(
                                  (r) => r.id == field.value
                                ) || null
                              }
                              onChange={(option) =>
                                field.onChange(option?.id.toString())
                              }
                            />
                          </div>
                        )}
                      />

                      {/* <CustomSelect
                        onValueChange={(value) => setValue("requesterId", value)} defaultValue={watch("requesterId")
                        defaultValue={watch("requesterId") }
                        options={dropDown?.requesters || []}
                        placeholder="-- Select Requester --"
                        onChange={(value) => setValue("requesterId", value?.id)}
                        showNoneOption={true}
                      /> */}

                      <Dialog
                        open={requesterOpen}
                        onOpenChange={setRequesterOpen}
                      >
                        <DialogTrigger asChild>
                          {/* <Button className="relative"> */}
                          <img
                            className="h-7 w-7 cursor-pointer absolute right-[2px] top-1/2 -translate-y-1/2 text-gray-600 border-l bg-white mt-[12px] px-[2px]"
                            alt="userIcon"
                            src={userIcon}
                          />
                          {/* </Button> */}
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[900px]  bg-white">
                          <DialogHeader className="max-h-[70vh] overflow-y-auto">
                            <Requester
                              footer={false}
                              setReq={(
                                field: keyof TicketFormSchema,
                                value: any
                              ) => {
                                setValue(field, value);
                                setRequesterOpen(false);
                              }}
                            />
                            {/* <DialogTitle>Add Requester</DialogTitle> */}
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      {/* <User  /> */}
                    </div>
                  </div>
                  {/* <div>
                  <Label>Employee ID</Label>
                  <Input placeholder="fetched on selection of requester" />
                </div> */}
                  <div>
                    <Label>Email</Label>
                    <Input
                      className="bg-white text-gray-900"
                      value={requesterData?.email || ""}
                      placeholder={""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      className="bg-white text-gray-900"
                      value={requesterData?.phonenumber || ""}
                      placeholder={""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Site</Label>
                    <Input
                      className="bg-white text-gray-900"
                      value={requesterData?.site_name || ""}
                      placeholder={""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      className="bg-white text-gray-900"
                      value={requesterData?.department_name || ""}
                      placeholder={""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      className="bg-white text-gray-900"
                      value={requesterData?.job_title || ""}
                      placeholder={""}
                      disabled
                    />
                  </div>

                  <div>
                    <Label>Asset</Label>
                    {/* <CustomSelect
                      options={dropDown?.requesters || []}
                      placeholder="-- Select Asset --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="asset_id"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <CustomSelect
                            {...field}
                            options={dropDown?.assets || []}
                            placeholder="-- Select Asset --"
                            defaultValue={
                              dropDown?.assets?.find(
                                (r) => r.id == field.value
                              ) || null
                            }
                            onChange={(option) =>
                              field.onChange(option?.id.toString())
                            }
                            showNoneOption
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="pb-6 border-b p-[15px]">
                <div className="py-2 font-semibold mb-4">Ticket Details</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="subject">
                      Subject*
                      {errors.subject && (
                        <span className="text-sm text-destructive mt-1 font-normal">
                          {errors.subject.message}
                        </span>
                      )}
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="Enter Subject"
                    />
                  </div>
                  <div>
                    <Label>Request Type</Label>
                    {/* <CustomSelect
                      options={dropDown?.requestTypes || []}
                      placeholder="-- Select Request Type --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="request_type_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.requestTypes || []}
                          placeholder="-- Select Request Type --"
                          defaultValue={
                            dropDown?.requestTypes?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Impact</Label>
                    {/* <CustomSelect
                      options={dropDown?.impacts || []}
                      placeholder="-- Select Impact --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="impact_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.impacts || []}
                          placeholder="-- Select Impact --"
                          defaultValue={
                            dropDown?.impacts?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Mode</Label>
                    {/* <CustomSelect
                      options={dropDown?.modes || []}
                      placeholder="-- Select Mode --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="mode_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.modes || []}
                          placeholder="-- Select Mode --"
                          defaultValue={
                            dropDown?.modes?.find((r) => r.id == field.value) ||
                            null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Level</Label>
                    {/* <CustomSelect
                      options={dropDown?.levels || []}
                      placeholder="-- Select Level --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="level_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.levels || []}
                          placeholder="-- Select Level --"
                          defaultValue={
                            dropDown?.levels?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Site</Label>
                    {/* <CustomSelect
                      options={dropDown?.sites || []}
                      placeholder="-- Select Site --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="site_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.sites || []}
                          placeholder="-- Select Site --"
                          defaultValue={
                            dropDown?.sites?.find((r) => r.id == field.value) ||
                            null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Group</Label>
                    {/* <CustomSelect
                      options={dropDown?.groups || []}
                      placeholder="-- Select Group --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="group_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.groups || []}
                          placeholder="-- Select Group --"
                          defaultValue={
                            dropDown?.groups?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    {/* <CustomSelect
                      options={dropDown?.categories || []}
                      placeholder="-- Select Category --"
                      onChange={(item) => {
                        setSelectedCategory(item.id);
                      }}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="category_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.categories || []}
                          placeholder="-- Select Category --"
                          defaultValue={
                            dropDown?.categories?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) => {
                            // update category value
                            field.onChange(option?.id?.toString() || "");

                            // reset sub-category when category changes
                            setValue("sub_category_id", "");
                            console.log("time", "testinggg");
                          }}
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  {/* <div>
                    <Label>Sub-Category</Label>
                    <CustomSelect
                      options={
                        (selectedCategory &&
                          categories.find(
                            (cat) => cat.id == selectedCategory
                          )?.subCategories) ||
                        []
                      }
                      placeholder="-- Select Sub-Category --"
                      onChange={(item) => {
                        setSelectedCategory(item.id);
                      }}
                      showNoneOption={true}
                    />
                  </div> */}
                  {/* Sub-Category Select (only show when available) */}
                  {/* {categoryId && ( */}
                  <div>
                    <Label>Sub-Category</Label>
                    <Controller
                      name="sub_category_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={(categoryId && subCatDropDownData) || []}
                          placeholder="-- Select Sub-Category --"
                          defaultValue={
                            subCatDropDownData?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id?.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  {/* )} */}

                  <div>
                    <Label>Technician</Label>
                    {/* <CustomSelect
                      options={dropDown?.technicians || []}
                      placeholder="-- Select Technician --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}

                    <Controller
                      name="assigned_to"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.technicians || []}
                          placeholder="-- Select Technician --"
                          defaultValue={
                            dropDown?.technicians?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input type="date" {...register("due_date")} />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    {/* <CustomSelect
                      options={dropDown?.priorities || []}
                      placeholder="-- Select Priority --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="priority_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.priorities || []}
                          placeholder="-- Select Priority --"
                          defaultValue={
                            dropDown?.priorities?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    {/* <CustomSelect
                      options={dropDown?.statuses || []}
                      placeholder="-- Select Status --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="status_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.statuses || []}
                          placeholder="-- Select Status --"
                          defaultValue={
                            dropDown?.statuses?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Completed</Label>
                    <Input
                      type="number"
                      {...register("completed")}
                      placeholder="Enter Percentage"
                    />
                  </div>
                  <div></div>

                  <div className="">
                    <Label>Notify By</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        {/* <Checkbox id="notify_by" defaultChecked
                        {...register("notify_by")}
                        /> */}
                        <Checkbox
                          id="notify_by"
                          defaultChecked
                          disabled={true}
                          {...register("notify_by")}
                          onCheckedChange={(checked: boolean) =>
                            setValue("notify_by", checked ? 1 : 0)
                          }
                        />
                        <label htmlFor="notify_by" className="text-sm">
                          Email
                        </label>
                      </div>
                      {/* <div className="flex items-center gap-2">
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
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <Label>Notify these by Email</Label>
                    {/* <CustomSelect
                      options={dropDown?.userEmails || []}
                      placeholder="-- Select Notify --"
                      onChange={handleSelectChange}
                      showNoneOption={true}
                    /> */}
                    <Controller
                      name="notify_emails"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.userEmails || []}
                          placeholder="-- Select Notify --"
                          defaultValue={
                            dropDown?.userEmails?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                        />
                      )}
                    />
                  </div>
                  <div></div>
                  {/* <div className="col-span-3">
                // <Label>Attachments</Label>
                <Button variant="outline" className="mt-2">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
              </div> */}
                  {/* <Label>Attachments</Label> */}
                  {/* <InputFile
        id="attachments"
        label="Choose file to upload"
        buttonText="Attach File"
        icon={attachmentIcons}
        {...register("attachments")}
        className="col-span-3"
        multiple
      /> */}
                  <div className="col-span-3">
                    <Label>Attachments</Label>
                    <Controller
                      name="attachments"
                      control={control}
                      render={({ field }) => (
                        <InputFile
                          id="attachments"
                          label="Choose file to upload"
                          buttonText="Attach File"
                          icon={attachmentIcons}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <AttachmentFilenames
                      value={filenames}
                      onChange={(val) => setValue("attachment_filenames", val)}
                    />
                  </div>
                  {/* <FileUpload files={files} onChange={setFiles} /> */}
                  {/* <div className="col-span-3 bg-white w-full border border-dashed border-gray-300 rounded-md flex items-center justify-between px-4 py-2">
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
                  </div> */}
                  <div className="col-span-3">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Enter Description"
                      rows={4}
                      className="mt-2 bg-white"
                      {...register("description")}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-[140px] h-[44px]"
                  onClick={() => {
                    navigate("/requests");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary w-[140px] h-[44px]"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {id ? "Update" : "Add"}
                  {/* Add */}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </MainLayout>
  );
};

export default AddRequest;
