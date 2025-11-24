import { X, File, Eye } from "lucide-react";

export const AttachmentFilenames = ({ value = [], onChange }) => {
  const removeField = (index) => {
    const copy = [...value];
    copy.splice(index, 1);
    onChange(copy);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const openPreview = (url: string) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-2 mt-2">
      {/* <label className="font-medium">Attachment Filenames</label> */}

      {/* File List UI (same style as your InputFile list) */}
      {value?.length > 0 && (
        <div className="space-y-1">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2 overflow-hidden w-full">
                <File className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="truncate">{item.file_name}</span>
                <span className="text-gray-400 text-xs">
                  ({formatSize(item.file_size)})
                </span>
              </div>
              <div className="flex items-center gap-2 ml-2">
                {/* Preview Icon */}
                {/* <img alt="" src={item.file_url}/> */}

                {/* Small Image Preview (only if image) */}
  {/* {item.file_url && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.file_url) && (
    <img
      src={item.file_url}
      alt="preview"
      className="w-10 h-10 rounded object-cover border"
    />
  )} */}
                <button
                  type="button"
                  onClick={() => openPreview(item.file_url)}
                  className="text-gray-600 hover:text-blue-600 transition"
                  title="Preview File"
                >
                  <Eye className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-gray-500 hover:text-red-600 transition ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
