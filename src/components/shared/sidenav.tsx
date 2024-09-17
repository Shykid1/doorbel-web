import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  InboxIcon,
  LayoutDashboard,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  to: string;
}

interface SideNavProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobile: boolean;
  closeMobileMenu: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  isCollapsed,
  toggleCollapse,
  isMobile,
  closeMobileMenu,
}) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      to: "/dashboard",
    },
    {
      name: "Transactions",
      icon: <CircleDollarSign className="h-5 w-5" />,
      to: "/transactions",
    },
    {
      name: "Account",
      icon: <UserCircle className="h-5 w-5" />,
      to: "/account",
    },
    {
      name: "Requests",
      icon: <InboxIcon className="h-5 w-5" />,
      to: "/requests",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      to: "/settings",
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <nav
      className={`bg-gray-800 text-white h-full ${
        isMobile
          ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out"
          : isCollapsed
          ? "w-16"
          : "w-64"
      } ${
        isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0"
      } transition-all duration-300 flex flex-col`}
    >
      <div className="flex justify-end p-4">
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMobileMenu}
            className="p-0 hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="p-0 hover:bg-gray-700"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>
      <div className="flex-grow">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center mb-2 w-full justify-start hover:bg-gray-600 ${
                isCollapsed && !isMobile ? "px-2" : "px-4"
              } ${isActive ? "bg-gray-700" : ""}`}
              onClick={isMobile ? closeMobileMenu : () => {}}
            >
              <Button
                variant="ghost"
                className={`flex items-center w-full justify-start ${
                  isActive ? "bg-gray-700 text-blue-400" : ""
                }`}
              >
                <span className={`mr-2 ${isActive ? "text-blue-400" : ""}`}>
                  {item.icon}
                </span>
                {(!isCollapsed || isMobile) && <span>{item.name}</span>}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;
