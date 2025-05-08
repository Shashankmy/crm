import { useLocation } from "wouter";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location, navigate] = useLocation();

  const handleNavClick = (href: string) => {
    navigate(href);
    
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-neutral-100",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-center h-16 px-4 bg-primary-500 text-white">
        <h1 className="text-xl font-semibold">LeadMaster CRM</h1>
      </div>
      
      <div className="flex flex-col flex-grow px-2 py-4 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-left",
                location === item.href
                  ? "bg-primary-600 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => handleNavClick(item.href)}
            >
              <span className="material-icons text-lg mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-shrink-0 p-4 border-t border-neutral-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-700">
            <span className="material-icons">person</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-700">Shashank M Y</p>
            <p className="text-xs text-neutral-500">Sales Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
