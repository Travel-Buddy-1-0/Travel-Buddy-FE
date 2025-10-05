import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderLeft from "../../components/Layout/HeaderLeft";
import HeaderTop from "../../components/Layout/HeaderTop";
import ChatAi from "../Chat/ChatAi";

export const LayoutDefault = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Tự collapse sau 10 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 5000); // 10000ms = 10s

    // cleanup khi component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex bg-[#F9F9F9]">
      <HeaderLeft collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col">
        <HeaderTop />
        {/* <ChatAi /> */}
        
     <Outlet />
  
        
      </div>
    </div>
  );
};
