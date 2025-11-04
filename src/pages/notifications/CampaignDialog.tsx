import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";

/* Types */
export type CampaignChannel = "email" | "sms" | "mobile";

export interface CampaignFormData {
  title: string;
  subject: string;
  description: string;
  tags: string;
}

export interface CampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultChannel?: CampaignChannel;
  availableTags?: string[];
  onSave?: (data: CampaignFormData & { channel: CampaignChannel }) => void;
  onCancel?: () => void;
}

/* Default tags */
const DEFAULT_TAGS = ["marketing", "newsletter", "promotion", "announcement"];

/* Simplified RichTextEditor */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing your email content...",
  minHeight = 120,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  return (
    <div className="border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: `${minHeight}px` }}
        className="w-full p-3 text-sm focus:outline-none resize-none bg-background"
        placeholder={placeholder}
      />
    </div>
  );
}

/* CampaignDialog Component */
export function CampaignDialog({
  open,
  onOpenChange,
  defaultChannel = "email",
  availableTags = DEFAULT_TAGS,
  onSave,
  onCancel,
}: CampaignDialogProps) {
  const [selectedChannel, setSelectedChannel] = useState<CampaignChannel>(defaultChannel);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    subject: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({ title: "", subject: "", description: "", tags: "" });
      setSelectedChannel(defaultChannel);
    }
  }, [open, defaultChannel]);

  const handleSave = () => {
    if (onSave) onSave({ ...formData, channel: selectedChannel });
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
          Create Campaign
          <span className="h-[18px] w-[18px] rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0">
            <img alt="plusIcon" src={plusIcon} />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold">Create Campaign</DialogTitle>
        </DialogHeader>

        {/* Channel Selection */}
        <div className="pt-4 flex gap-2 mb-4 justify-center">
          {["sms", "email", "mobile"].map(channel => (
            <Button
              key={channel}
              variant={selectedChannel === channel ? "default" : "outline"}
              onClick={() => setSelectedChannel(channel as CampaignChannel)}
              className="flex-1 transition-all max-w-[150px]"
            >
              {channel.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email Subject */}
          {selectedChannel === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Add Subject</Label>
              <Input
                id="subject"
                placeholder="Enter Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
          )}

          {/* SMS/Mobile Title */}
          {(selectedChannel === "sms" || selectedChannel === "mobile") && (
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              Add Tags <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.tags}
              onValueChange={(value) => setFormData({ ...formData, tags: value })}
            >
              <SelectTrigger id="tags">
                <SelectValue placeholder="Available Tags" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          {/* {selectedChannel === "email" ? (
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          ) : ( */}
            <Textarea
              placeholder="Enter Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] resize-none"
            />
          {/* )} */}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" className="w-[140px] h-[44px]" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="bg-primary w-[140px] h-[44px]" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}