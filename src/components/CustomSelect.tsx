import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export interface Option {
  name: string;
  id: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (id: Option | null) => void;
  defaultValue?: Option | null;
  showNoneOption?: boolean;
  className?: string; // parent can style the trigger button
  dropdownClassName?: string;
}

export default function CustomSelect({
  options,
  placeholder = "--Select--",
  onChange,
  defaultValue = null,
  showNoneOption = true,
  className = "", // parent can style the trigger button
  dropdownClassName = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(defaultValue);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  setSelected(defaultValue || null);
}, [defaultValue]);

  // Combine "None" option if enabled
  const finalOptions = showNoneOption
    ? [{ name: placeholder, id: "" }, ...options]
    : options;

  // Filter by search
  const filtered = finalOptions.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle select
  const handleSelect = (item: Option) => {
    if (item.id === "") {
      setSelected(null);
      onChange?.(null);
    } else {
      setSelected(item);
      onChange?.(item);
    }
    setIsOpen(false);
    setSearch("");
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSearch("");
      return next;
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "w-full flex justify-between items-center px-[5px] py-[5px] border rounded-[3px] text-[13px] bg-white focus:outline-none",
          className
        )}
        type="button"
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.name : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute rounded-md z-10 mt-1 min-w-[200px] w-full bg-white border border-gray-200 shadow-sm",
            dropdownClassName
          )}
        >
          {/* Search */}
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              placeholder="Search..."
              className="w-full border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Options */}
          <ul className="max-h-48 overflow-y-auto text-sm">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li
                  key={item.id || "none"}
                  onClick={() => handleSelect(item)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selected?.id === item.id ? "bg-blue-100" : ""
                  }`}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 bg-[#f5f5f5] text-gray-400 text-center text-xs">No matches found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
