import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, Settings } from "lucide-react";
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
import Helpdesk from "./healper/Helpdesk";

const worklogtype = [
  {
    id: 1,
    icon: Settings,
    name: "General Services",
    description: "Worklog type for tasks under general services.",
  },
];

const WorklogType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState(worklogtype);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onsubmit = (data) => {
    console.log("Data Submitted succesfully", data);
    alert("Form submitted");
  };

  const handleEdit = (tasktype) => {
    setSelectedTask(tasktype);
    setIsOpen(true);
    setValue("name", tasktype.name);
    setValue("desc", tasktype.desc);
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
          WorklogType
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
          New WorklogType
        </button>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow className="py-1">
            <TableHead className="w-5 text-xs"></TableHead>
            <TableHead className="flex items-center gap-2 text-gray-500 text-xs">
              Name
              <ArrowDown size={14} />
            </TableHead>
            <TableHead className="text-gray-500 text-xs">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((worklogtype) => (
            <TableRow key={worklogtype.id}>
              <TableCell className="py-1 text-xs">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                    <worklogtype.icon className="w-4 h-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={4}
                    className="z-50"
                  >
                    <DropdownMenuItem onClick={() => handleEdit(worklogtype)}>
                      Edit Worklog Type
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTask(worklogtype);
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell
                className="py-1 text-xs cursor-pointer hover:underline text-[#333333]"
                onClick={() => handleEdit(worklogtype)}
              >
                {worklogtype.name}
              </TableCell>
              <TableCell className="py-1 text-xs text-[#333333]">
                {worklogtype.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? "Edit WorklogType" : "Add WorklogType"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Name!",
                  },
                })}
                className={`border focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                placeholder="Enter Request Type"
                value={selectedTask?.name || ""}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    name: e.target.value,
                  })
                }
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
            <div className="flex justify-end gap-4 pt-4">
              <Button className="bg-primary w-[140px] h-[44px]" type="submit">
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

export default WorklogType;
