import { color } from "echarts";
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
  sub_category_id: z.string().optional(),
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
  attachment_filenames: z.any().optional()
});

export type TicketFormSchema = z.infer<typeof ticketFormSchema>;

export const closeFormSchema = z.object({
  status_id: z.string().optional(),
  closure_code_id: z.string().optional(),
  comment: z.string().optional(),
  is_fcr: z.boolean().default(false),
  is_requester_acknowledged: z.string().default("false"),
  closing_comment: z.string().optional(),

  // employee_id: z.string().optional(),
  // email: z.string().email("Invalid email address"),
  // phonenumber: z.string().optional(),
  // mobile: z.string().optional(),
  // company_id: z.string(),
  // department_id: z.string().optional(),
  // role_id: z.string().optional(),
  // reporting_manager_id: z.string().optional(),
  // job_title: z.string().optional(),
  // allowed_to_view: z.string().optional(),
  // description: z.string().optional(),
});

export type CloseFormSchema = z.infer<typeof closeFormSchema>;

export const requesterFormSchema = z.object({
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().optional(),
  employee_id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phonenumber: z.string().optional(),
  mobile: z.string().optional(),
  // company_id: z.string(),
  site_id: z.string().optional(),
  department_id: z.string().optional(),
  role_id: z.string().optional(),
  reporting_manager_id: z.string().optional(),
  job_title: z.string().optional(),
  allowed_to_view: z.string().optional(),
  is_active: z.boolean().default(true),
  description: z.string().optional(),
});

export type RequesterFormSchema = z.infer<typeof requesterFormSchema>;

export const noteFormSchema = z.object({
  description: z.string().nonempty("Note is required"),
  is_private: z.boolean().default(true),
});

export type NoteFormSchema = z.infer<typeof noteFormSchema>;

export const technicianFormSchema = z.object({
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().optional(),
  employee_id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phonenumber: z.string().optional(),
  mobile: z.string().optional(),
  // company_id: z.string(),
  site_id: z.string().optional(),
  department_id: z.string().optional(),
  associated_sites: z.string().optional(),
  reporting_manager_id: z.string().optional(),
  job_title: z.string().optional(),
  associated_departments: z.string().optional(),
  cost_per_hour: z.string().optional(),
  description: z.string().optional(),
});

export type TechnicianFormSchema = z.infer<typeof technicianFormSchema>;

// Level component validation
export const nameDescriptionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  color: z.string().optional(),
});
// Types
export type NameDescriptionSchema = z.infer<typeof nameDescriptionSchema>;

export const categoryDescriptionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});
export type CategoryDescriptionSchema = z.infer<
  typeof categoryDescriptionSchema
>;

export const siteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),

  // Address fields
  doorNumber: z.string().optional(),
  region_id: z.number().nullable().optional(),
  timezone: z.string().optional(),
  country_id: z.string().optional(),
  language: z.string().optional(),
  street: z.string().optional(),
  landmark: z.string().optional(),
  city_id: z.string().optional(),
  province: z.string().optional(),

  email: z.string().optional(),

  phone: z.string().optional(),

  fax: z.string().optional(),

  website: z.string().optional(),
});

export type SiteFormInputs = z.infer<typeof siteSchema>;

export const departmentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  site_id: z.string().optional(),
  department_head_id: z.string().optional(),
});

export type DepartmentFormSchema = z.infer<typeof departmentFormSchema>;

export const subCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Subcategory name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  category_id: z.string().min(1, "Please select a category"),
});

export type SubCategorySchema = z.infer<typeof subCategorySchema>;
