import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  UtensilsIcon,
  LogOutIcon,
  Settings
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: "home" | "diet" | "profile";
}

const DashboardLayout = ({ children, activeTab }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard", id: "home" },
    { name: "Diet Plan", icon: <UtensilsIcon className="w-5 h-5" />, href: "/diet-plan", id: "diet" },
  ];

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 py-3 px-4 shadow-sm border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl text-fitness-primary">FitLife</span>
        </Link>
        <button className="p-2">
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-fitness-primary">FitLife</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <nav className="mt-5 px-4 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavigation(item.href)}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === item.id
                    ? "bg-fitness-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="mb-6 px-4 mt-auto">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-6 pb-12 px-4 sm:px-6 md:px-8">
          {children}
        </main>
        
        {/* Mobile Navigation */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2">
          <div className="max-w-md mx-auto px-4 flex justify-between">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavigation(item.href)}
                className={`flex flex-col items-center pt-2 pb-1 ${
                  activeTab === item.id
                    ? "text-fitness-primary"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="mb-1">{item.icon}</div>
                <span className="text-xs">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
