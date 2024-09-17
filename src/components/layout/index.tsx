import React, { useState, useEffect } from "react";
import SideNav from "../shared/sidenav";
import TopNav, { UserData } from "../shared/dashboard-topnav";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const user: UserData = { name: "John Doe", email: "john@example.com" };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideNav
        isCollapsed={isCollapsed}
        toggleCollapse={toggleSidebar}
        isMobile={isMobile}
        closeMobileMenu={() => setIsCollapsed(true)}
      />
      <div className="flex w-full flex-col flex-grow">
        <TopNav user={user} toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
