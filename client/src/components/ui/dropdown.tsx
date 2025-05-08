import { useState, useRef, useEffect } from "react";
import { Button } from "./button";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function Dropdown({ label, options, selectedValue, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the currently selected option label
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : label;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        className="inline-flex justify-center rounded-md border border-neutral-200 shadow-sm px-4 py-2 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        onClick={toggleDropdown}
      >
        <span>{displayLabel}</span>
        <span className="material-icons text-sm ml-2">arrow_drop_down</span>
      </Button>
      
      {isOpen && (
        <div className="dropdown-content show">
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
