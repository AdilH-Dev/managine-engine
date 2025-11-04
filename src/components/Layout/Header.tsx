import { Bell, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import straightLogo from "@/assets/svg-icons/straight-logo.svg";


interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 px-4 h-[48px] flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        {/* <button className="p-2 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button> */}
        {/* {onBack && ( */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="h-6 w-6 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-[18px]">
        Viper Technologies
        </span>
        {/* )} */}
        {/* <img src={straightLogo} alt="Logo" className=""/> */}
        {/* <h1 className="text-xl font-semibold text-gray-800">{title}</h1> */}
      </div>

      <div className="flex items-center gap-2">
        {/* {showCompanySelector && ( */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="mr-1">🏢</span>
              Viper Technologies
              <ChevronLeft className="ml-1 h-4 w-4 rotate-[-90deg]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuItem>Viper Technologies</DropdownMenuItem>
            <DropdownMenuItem>Other Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        {/* )} */}
        <button className="relative p-2 hover:bg-gray-100 rounded">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1">
            <Avatar className="w-8 h-8 border me-1">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adam" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            {/* <span className="text-sm font-medium text-gray-700">
              Adam James
            </span> */}
            {/* <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
