import { z } from "zod";

export const ticketFormSchema = z.object({
  requested_by: z.string().min(1, "Requester is required"),
  asset_id: z.string().optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  request_type_id: z.string().optional(),
  technicianId: z.string().optional(),
  impact_id: z.string().optional(),
  mode_id: z.string().optional(),
  level_id: z.string().optional(),
  site_id: z.string().optional(),
  group_id: z.string().optional(),
  category_id: z.string().optional(),
  assigned_to: z.string().optional(),
  due_date: z.string().optional(),
  priority_id: z.string().optional(),
  status_id: z.string().optional(),
  completed: z.string().optional(),
  notify_by: z.number().optional(),
  notify_emails: z.string().optional(),
  description: z
    .string()
    .optional() // field is optional
    .refine((val) => !val || val.length >= 1, {
      message: "Description is required",
    })
    .refine((val) => !val || val.length <= 5000, {
      message: "Description must be less than 5000 characters",
    }),

  urgency: z.enum(["low", "medium", "high"]).optional(),
  // impact: z.enum(["low", "medium", "high"]).optional(),
  // mode: z.string().optional(),
  // level: z.string().optional(),
  subCategory: z.string().optional(),
  // site: z.string().optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.any().optional(),
  });

export type TicketFormSchema = z.infer<typeof ticketFormSchema>;
