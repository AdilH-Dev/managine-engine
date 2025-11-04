import * as React from "react";
import { cn } from "@/lib/utils";
import { X, File } from "lucide-react";

interface InputFileProps {
  id: string;
  label?: string;
  buttonText?: string;
  icon?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      id,
      label = "Choose file to upload",
      buttonText = "Attach File",
      icon,
      multiple = true,
      maxFiles = 10,
      maxSize = 10 * 1024 * 1024, // 10 MB
      value = [],
      onChange,
      className,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter((file) => file.size <= maxSize);
      const newFiles = [...(value || []), ...validFiles].slice(0, maxFiles);
      onChange?.(newFiles);

      // ✅ Reset input so same file can be uploaded again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const handleRemove = (index: number) => {
      const updated = value.filter((_, i) => i !== index);
      onChange?.(updated);
    };

    const formatSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    return (
      <div className={cn("space-y-3", className)}>
        <div className="bg-white w-full border border-dashed border-gray-300 rounded-md flex items-center justify-between px-4 py-2">
          <label
            htmlFor={id}
            className="text-sm text-gray-500 cursor-pointer flex-1 truncate"
          >
            {label}
          </label>

          <input
            id={id}
            type="file"
            className="hidden"
            multiple={multiple}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            onChange={handleFileChange}
          />

          <label
            htmlFor={id}
            className="bg-[#464D9B] w-[120px] text-white text-sm px-4 py-1.5 rounded-md cursor-pointer flex items-center gap-1 hover:bg-[#3b4389] transition"
          >
            {icon && <img alt="" src={icon} />}
            {buttonText}
          </label>
        </div>

        {value.length > 0 && (
          <div className="space-y-1">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <File className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-400 text-xs">
                    ({formatSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

InputFile.displayName = "InputFile";
