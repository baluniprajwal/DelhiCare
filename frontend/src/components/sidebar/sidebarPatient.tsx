import React, { useState, useEffect } from "react";
import {  IconMenu2, IconX } from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import {  MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { GoCalendar } from "react-icons/go";
import { MdOutlineAccountTree } from "react-icons/md";

interface LinkType {
  label: string;
  href: string;
  icon: React.JSX.Element;
  section?: string;
}

export function SidebarPatient() {
  const navigate = useNavigate(); // React Router hook to programmatically navigate
  const links: LinkType[] = [
    {
      label: "Overview",
      href: "overview",
      icon: <MdOutlineAccountTree className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />,
    },
    {
      label: "Patient Information",
      href: "appointmentdetails",
      icon: <MdOutlinePersonAddAlt1 className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />,
    },
    {
      label: "Documents",
      href: "documents",
      icon: <IoDocumentSharp className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />,
    },
    {
      label: "Appointment Details",
      href: "appointmentDetails",
      icon: <GoCalendar className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />,
    },
  ];

  const sections = Array.from(new Set(links.map(link => link.section)));

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Navigate to the "Overview" section when the dashboard first loads
  useEffect(() => {
    navigate("overview");
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "h-screen bg-gray-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700",
          isSidebarExpanded ? "w-64" : "w-20", 
          "hidden md:flex fixed left-0 top-0 z-40 transition-width duration-200 ease-in-out"
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {isSidebarExpanded ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {sections.map((section, secIdx) => (
                <div key={secIdx} className="mt-5">
                  {isSidebarExpanded && section && (
                    <h3 className="text-sm text-neutral-500 dark:text-neutral-400 pl-4">{section}</h3>
                  )}
                  {links
                    .filter(link => link.section === section)
                    .map((link, idx) => (
                      <SidebarLink key={idx} link={link} isSidebarExpanded={isSidebarExpanded} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full bg-gray-100 dark:bg-neutral-800 p-4 fixed top-0 left-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold"></h1>
          <button onClick={() => setMobileSidebarOpen(true)}>
            <IconMenu2 className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-gray-100 dark:bg-neutral-900 p-10 z-50"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <IconX className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} isSidebarExpanded={true} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 p-4 overflow-y-auto transition-all duration-300", 
          isSidebarExpanded ? "md:ml-64" : "md:ml-20"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link to="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 mt-6 ml-2">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white">
        DelhiCare
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 mt-6 ml-2">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

interface SidebarLinkProps {
  link: LinkType;
  isSidebarExpanded: boolean;
}

export const SidebarLink = ({ link, isSidebarExpanded }: SidebarLinkProps) => {
  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center gap-2 py-2 transition-all duration-200 ease-in-out mt-5",
        isSidebarExpanded ? "justify-start" : "justify-center"
      )}
    >
      <div className="flex items-center justify-center h-10 w-10">
        {link.icon}
      </div>
      {isSidebarExpanded && (
        <span className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-nowrap">
          {link.label}
        </span>
      )}
    </Link>
  );
};