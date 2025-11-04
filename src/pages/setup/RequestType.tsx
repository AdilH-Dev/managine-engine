import { useState } from "react";
import { Card } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import Helpdesk from "./healper/Helpdesk";

const item = [
  { id: 1, icon: Settings, name: "Incident", description: "Faults and errors" },
  {
    id: 2,
    icon: Settings,
    name: "Service Request",
    description: "User service request",
  },
  {
    id: 3,
    icon: Settings,
    name: "Problem",
    description: "Recurring issue tracking",
  },
  {
    id: 4,
    icon: Settings,
    name: "Change",
    description: "System change request",
  },
];

const RequestType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState(item);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const onsubmit = (data) => {
    console.log("form submitted", data);
    alert("Form submitted succesfully!");
    setIsOpen(false);
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
          RequestType
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
          New RequestType
        </button>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow className="py-1">
            <TableHead className="w-5 text-xs"></TableHead>
            <TableHead className="text-gray-500 text-xs flex items-center gap-2">
              Name
              <ArrowUp size={14} />
            </TableHead>
            <TableHead className="text-gray-500 text-xs">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-1 text-xs ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100  rounded p-1 w-full">
                    <item.icon className="w-4 h-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={4}
                    className="z-50 w-[140px]"
                  >
                    <DropdownMenuItem onClick={() => handleEdit(item)}>
                      Edit Request Type
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTask(item);
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell
                className="py-1 text-xs cursor-pointer hover:underline"
                onClick={() => handleEdit(item)}
              >
                {item.name}
              </TableCell>
              <TableCell className="py-1 text-xs">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? "Edit RequestType" : "Add Requestype"}
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
                    message: "Invalid name",
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

export default RequestType;
