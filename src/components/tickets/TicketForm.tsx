// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ticketFormSchema, type TicketFormSchema } from "@/lib/validation";
// import { ticketService } from "@/services/ticketService";
// import { DropdownOption, Ticket } from "@/types/ticket";
// import { FileUpload } from "./FileUpload";
// import { RichTextEditor } from "./RichTextEditor";
// import { toast } from "@/hooks/use-toast";

// interface TicketFormProps {
//   ticket?: Ticket;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// export function TicketForm({ ticket, onSuccess, onCancel }: TicketFormProps) {
//   const [loading, setLoading] = useState(false);
//   const [requesters, setRequesters] = useState<DropdownOption[]>([]);
//   const [technicians, setTechnicians] = useState<DropdownOption[]>([]);
//   const [groups, setGroups] = useState<DropdownOption[]>([]);
//   const [files, setFiles] = useState<File[]>([]);
//   const [description, setDescription] = useState(ticket?.description || "");

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<TicketFormSchema>({
//     resolver: zodResolver(ticketFormSchema),
//     defaultValues: {
//       subject: ticket?.subject || "",
//       description: ticket?.description || "",
//       // requesterId: ticket?.requesterId || "",
//       technicianId: ticket?.technicianId || "",
//       groupId: ticket?.groupId || "",
//       status: ticket?.status || "open",
//       priority: ticket?.priority || "medium",
//       urgency: ticket?.urgency || "medium",
//       impact: ticket?.impact || "medium",
//     },
//   });

//   useEffect(() => {
//     loadDropdownData();
//   }, []);

//   const loadDropdownData = async () => {
//     try {
//       const [reqData, techData, groupData] = await Promise.all([
//         ticketService.getRequesters(),
//         ticketService.getTechnicians(),
//         ticketService.getGroups(),
//       ]);
//       setRequesters(reqData);
//       setTechnicians(techData);
//       setGroups(groupData);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load form data",
//         variant: "destructive",
//       });
//     }
//   };

//   const onSubmit = async (data: TicketFormSchema) => {
//     setLoading(true);
//     try {
//       const formData: any = { ...data, attachments: files, description };
      
//       if (ticket) {
//         await ticketService.updateTicket(ticket.id, formData);
//         toast({ title: "Success", description: "Ticket updated successfully" });
//       } else {
//         await ticketService.createTicket(formData);
//         toast({ title: "Success", description: "Ticket created successfully" });
//       }
//       onSuccess();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: ticket ? "Failed to update ticket" : "Failed to create ticket",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="md:col-span-2">
//           <Label htmlFor="subject">
//             Subject <span className="text-destructive">*</span>
//           </Label>
//           <Input id="subject" {...register("subject")} placeholder="Enter ticket subject" />
//           {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="requesterId">
//             Requester <span className="text-destructive">*</span>
//           </Label>
//           <Select onValueChange={(value) => setValue("requesterId", value)} defaultValue={watch("requesterId")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Requester" />
//             </SelectTrigger>
//             <SelectContent>
//               {requesters.map((req) => (
//                 <SelectItem key={req.id} value={req.id}>
//                   {req.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.requesterId && <p className="text-sm text-destructive mt-1">{errors.requesterId.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="technicianId">Technician</Label>
//           <Select onValueChange={(value) => setValue("technicianId", value)} defaultValue={watch("technicianId")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Technician" />
//             </SelectTrigger>
//             <SelectContent>
//               {technicians.map((tech) => (
//                 <SelectItem key={tech.id} value={tech.id}>
//                   {tech.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="groupId">Group</Label>
//           <Select onValueChange={(value) => setValue("groupId", value)} defaultValue={watch("groupId")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Group" />
//             </SelectTrigger>
//             <SelectContent>
//               {groups.map((group) => (
//                 <SelectItem key={group.id} value={group.id}>
//                   {group.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="status">
//             Status <span className="text-destructive">*</span>
//           </Label>
//           <Select onValueChange={(value) => setValue("status", value as any)} defaultValue={watch("status")}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="open">Open</SelectItem>
//               <SelectItem value="in-progress">In Progress</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="closed">Closed</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="priority">
//             Priority <span className="text-destructive">*</span>
//           </Label>
//           <Select onValueChange={(value) => setValue("priority", value as any)} defaultValue={watch("priority")}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="low">Low</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//               <SelectItem value="urgent">Urgent</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="urgency">Urgency</Label>
//           <Select onValueChange={(value) => setValue("urgency", value as any)} defaultValue={watch("urgency")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Urgency" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="low">Low</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="impact">Impact</Label>
//           <Select onValueChange={(value) => setValue("impact", value as any)} defaultValue={watch("impact")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Impact" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="low">Low</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="md:col-span-2">
//           <Label htmlFor="description">
//             Description <span className="text-destructive">*</span>
//           </Label>
//           <RichTextEditor
//             value={description}
//             onChange={(value) => {
//               setDescription(value);
//               setValue("description", value);
//             }}
//             placeholder="Enter ticket description..."
//           />
//           {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
//         </div>

//         <div className="md:col-span-2">
//           <Label>Attachments</Label>
//           <FileUpload files={files} onChange={setFiles} />
//         </div>
//       </div>

//       <div className="flex justify-end gap-3">
//         <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={loading}>
//           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           {ticket ? "Update Ticket" : "Create Ticket"}
//         </Button>
//       </div>
//     </form>
//   );
// }
