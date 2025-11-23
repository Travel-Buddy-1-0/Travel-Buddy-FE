import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderLeft from "../../components/Layout/HeaderLeft";
import HeaderTop from "../../components/Layout/HeaderTop";
import ChatAi from "../Chat/ChatAi";

export const LayoutDefault = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tự collapse sau 10 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 5000); // 10000ms = 10s

    // cleanup khi component unmount
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex bg-[#F9F9F9] min-h-screen">
      <HeaderLeft 
        collapsed={collapsed} 
        toggle={() => setCollapsed(!collapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderTop toggleMobileMenu={toggleMobileMenu} />
        {/* <ChatAi /> */}
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
  
        
      </div>
    </div>
  );
};
