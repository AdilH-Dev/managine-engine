import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, Settings } from "lucide-react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Form } from "@/components/ui/form";
import Helpdesk from "./healper/Helpdesk";

const tasktypes = [
  {
    id: 1,
    icon: Settings,
    name: "Final Verification",
    description:
      "Tasks related to the final verification of information or processes",
    color: "none",
  },
  {
    id: 2,
    icon: Settings,
    name: "Implementation",
    description: "Implementation of the planned work.",
    color: " #999900",
  },
  {
    id: 3,
    icon: Settings,
    name: "Install/UnInstall",
    description: "	Install/UnInstall of the software.",
    color: "	 #666666",
  },
  {
    id: 4,
    icon: Settings,
    name: "Maintenance",
    description: "	Maintenance task to ensure the good condition of the system.",
    color: "#ff6600",
  },
];

const TaskType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState(tasktypes);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const onsubmit = (data) => {
    console.log("Form submitted", data);
    alert("Form submitted successfully");
    setIsOpen(false);
  };

  const handleEdit = (tasktype) => {
    setSelectedTask(tasktype);
    setIsOpen(true);
    setValue("name", tasktype.name);
    setValue("description", tasktype.description);
    setValue("color", tasktype.color);
  };

  const handleNew = () => {
    setSelectedTask(null);
    reset();
    setIsOpen(true);
  };
  const handleDelete = () => {
    setData(data.filter((row) => row.id !== selectedTask.id));
    setShowDelete(false);
  };

  return (
    <Helpdesk>
      <div className="flex items-center justify-between border-b px-4 py-2 bg-white border-[#e6e6e6] border-dotted">
        <h2 className="text-base font-semibold text-foreground flex-shrink-0 leading-[40px]">
          TaskType
        </h2>
        <span className="bg-blue-600 w-7 h-7 flex items-center justify-center rounded-full text-white text-sm">
          ?
        </span>
      </div>
      <div className="bg-white">
        <button
          className="mt-3 mb-2 ml-4 bg-white text-[#333333] text-xs rounded-none border border-[#ccd3de] px-3 py-1.5 hover:bg-gray-300"
          onClick={() => {
            setSelectedTask(null);
            setIsOpen(true);
          }}
        >
          New TaskType
        </button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="py-1">
            <TableHead className="w-5 py-1.5 text-xs"></TableHead>
            <TableHead className="text-gray-500 text-xs py-1.5 flex items-center gap-2">
              Name <ArrowUp size={14} />
            </TableHead>
            <TableHead className="text-gray-500 py-1.5 text-xs">
              Description
            </TableHead>
            <TableHead className="text-gray-500 py-1.5 text-xs">
              Color
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((tasktype) => (
            <TableRow key={tasktype.id}>
              <TableCell className="py-1.5 text-xs">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                    <tasktype.icon className="w-4 h-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={4}
                    className="z-50"
                  >
                    <DropdownMenuItem onClick={() => handleEdit(tasktype)}>
                      Edit Task Type
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTask(tasktype);
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell
                className="py-1.5 text-xs cursor-pointer hover:underline"
                onClick={() => handleEdit(tasktype)}
              >
                {tasktype.name}
              </TableCell>
              <TableCell className="py-1.5 text-xs">
                {tasktype.description}
              </TableCell>
              <TableCell className="py-1.5 text-xs flex items-center gap-2">
                {tasktype.color === "none" ? (
                  <div className="flex items-center gap-1 text-gray-500">
                    <div className="w-3 h-3 flex items-center justify-center border border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <line x1="4" y1="20" x2="20" y2="4" />
                      </svg>
                    </div>
                    <span>None</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3"
                      style={{ backgroundColor: tasktype.color }}
                    ></div>
                    <span>{tasktype.color}</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? "Edit TaskType" : "Add TaskType"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4 pt-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is reqiured!",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Inavalid name",
                  },
                })}
                className={`border focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                placeholder="Enter Task Type"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.name.message)}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="Description">Description</Label>
              <Input
                id="Desc"
                placeholder=""
                value={selectedTask?.description || ""}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                type="color"
                id="color"
                className="w-[120px] h-[30px] p-1 cursor-pointer"
                value={selectedTask?.color || "#000000"}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    color: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="submit" className="bg-primary w-[140px] h-[44px]">
                Save
              </Button>
              <Button
                variant="outline"
                className="bg-white w-[140px] h-[44px]"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent className="rounded-xl py-2  px-0 bg-white">
          <AlertDialogHeader className="border-b">
            <AlertDialogTitle className="text-red-600 px-3">
              Delete
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="px-3">
            Do you want to delete selected Task Type?
          </AlertDialogDescription>
          <AlertDialogFooter className="px-3 mb-2">
            <AlertDialogCancel className="rounded-full px-6">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-full px-6 hover:bg-red-700 transition"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Helpdesk>
  );
};

export default TaskType;
