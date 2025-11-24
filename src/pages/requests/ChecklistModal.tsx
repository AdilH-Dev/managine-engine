import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

export default function ChecklistModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([
    { title: "", additionalInput: "No Additional Input" },
  ]);

  const additionalOptions = [
    "No Additional Input",
    "Text Field",
    "Numeric Field",
    "Radio Button",
  ];

  const addItem = () => {
    setItems([...items, { title: "", additionalInput: "No Additional Input" }]);
  };

  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // if (!isOpen) return null;

  console.log("ChecklistModalisOpen", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-white p-0">
        <DialogHeader className=" border-b p-4 text-[18px]">
          <DialogTitle className="font-normal">New Checklist</DialogTitle>
        </DialogHeader>

        <div className="relative">
          {/* Name and Description */}
          <div className="flex gap-4 items-center border-b pb-4 mb-4 px-4">
            <div className="flex items-center gap-4 flex-1">
              <Label
                htmlFor="name"
                className="font-normal text-[14px] flex-shrink-0"
              >
                Name <span className="text-red-500">*</span>
              </Label>

              <Input
                // {...register("closing_comment")}
                id="name"
                placeholder=""
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <Label htmlFor="description" className="font-normal text-[14px]">
                Description
              </Label>

              <Input
                // {...register("closing_comment")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder=""
                className="w-full"
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="mb-4 px-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold mb-2 text-[15px]">
                Checklist Items ({items.length}/25)
              </h3>
              <div className="flex items-center justify-end gap-2">
                <Button
                  onClick={addItem}
                  className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto"
                >
                  New Item
                </Button>
                <Button className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto">
                  Add Existing Items
                </Button>
                <Button className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto">
                  Add from CSV
                </Button>
              </div>
            </div>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-2 border-gray-200 rounded p-2 min-h-[40px]"
              >
                <span className="cursor-move text-gray-400">⋮⋮</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center rounded p-1">
                    <Settings className="w-4 h-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {additionalOptions.map((opt) => (
                      <DropdownMenuItem
                      // onClick={() => {
                      //   setIsOpen(true);
                      //   setEditId(dept.id);
                      // }}
                      >
                        {opt}
                      </DropdownMenuItem>
                      // <option key={opt} value={opt}>
                      //   {opt}
                      // </option>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <input
                  type="text"
                  placeholder="Add a checklist item"
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                /> */}
                <Input
                  // {...register("closing_comment")}
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  // id="description"
                  placeholder="Add a checklist item"
                  className="w-full border-b border-t-0 border-l-0 border-r-0 rounded-none  focus:ring-0 focus:ring-offset-0"
                  type="text"
                />
                {/* <select
                  value={item.additionalInput}
                  onChange={(e) =>
                    updateItem(index, "additionalInput", e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {additionalOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select> */}
                
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  −
                </button>
              </div>
            ))}
          </div>

          {/* Save / Cancel */}
          <div className="flex justify-center gap-2 py-3 border-t">
            <Button className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#4588f0] hover:bg-[#4588f0]/90 text-[white] h-auto">
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                onClose(false);
              }}
              className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#f5f5f5] hover:bg-[#ececec] border text-[#333333] h-auto"
            >
              Cancel
            </Button>
            {/* <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
              Save
            </button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
