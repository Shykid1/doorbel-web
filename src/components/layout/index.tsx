import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 10 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <SideNav
        isCollapsed={isCollapsed}
        toggleCollapse={toggleSidebar}
        isMobile={isMobile}
        closeMobileMenu={() => setIsCollapsed(true)}
      />
      <div className="flex w-full flex-col flex-grow">
        <TopNav user={user} toggleSidebar={toggleSidebar} />
        <motion.main
          className="flex-grow p-6 overflow-auto w-full"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
