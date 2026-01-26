import { UserButton } from "@clerk/clerk-react";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const pathname = useLocation().pathname;
  const isActive = (path) => path === pathname;
  return (
    <div className="bg-base-100 backdrop-blur-md shadow-xl border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link
          to={"/"}
          className="hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent size-12 rounded-2xl flex items-center justify-center">
              <SparklesIcon className="text-white size-6" />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text font-black font-mono text-xl tracking-wider">
                Talent Meet
              </span>
              <span className="text-xs text-base-content/70 font-medium">
                Code Together
              </span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200  ${isActive("/problems") ? "bg-primary text-primary-content" : "text-base-content/70 hover:text-base-content hover:bg-base-200"}`}
          >
            <div className="flex items-center gap-1">
              <BookOpenIcon className="size-4" />
              <span className="hidden sm:inline">Problems</span>
            </div>
          </Link>
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200  ${isActive("/dashboard") ? "bg-primary text-primary-content" : "text-base-content/70 hover:text-base-content hover:bg-base-200"}`}
          >
            <div className="flex items-center gap-1">
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </div>
          </Link>
          <div className="ml-4 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
