import { useState, useRef, useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option | null) => void;
  defaultValue?: Option | null;
  showNoneOption?: boolean;
}

export default function CustomSelect({
  options,
  placeholder = "--Select--",
  onChange,
  defaultValue = null,
  showNoneOption = true,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(defaultValue);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine "None" option if enabled
  const finalOptions = showNoneOption
    ? [{ label: placeholder, value: "" }, ...options]
    : options;

  // Filter by search
  const filtered = finalOptions.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
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
    if (item.value === "") {
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
        className="w-full flex  justify-between items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-[#f5f5f5] hover:border-gray-400 focus:outline-none"
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
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
        <div className="absolute rounded-md z-10 mt-1 w-full bg-white border border-gray-200 shadow-sm">
          {/* Search */}
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Options */}
          <ul className="max-h-48 overflow-y-auto text-sm">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li
                  key={item.value || "none"}
                  onClick={() => handleSelect(item)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selected?.value === item.value ? "bg-blue-100" : ""
                  }`}
                >
                  {item.label}
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
