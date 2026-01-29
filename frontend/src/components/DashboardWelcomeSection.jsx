import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

const DashboardWelcomeSection = ({ onCreateSession }) => {
  const { user } = useUser();
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 size-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <SparklesIcon className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
              Welcome back, {user.firstName || "there"}!
            </h2>
            <p className="text-sm text-base-content/70">
              Ready to level up your coding skills?
            </p>
          </div>
        </div>
        <button
          onClick={onCreateSession}
          className="group px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-xl transition-all duration-200 hover:opacity-80"
        >
          <div className="flex items-center gap-3 text-white font-bold text-sm lg:text-base">
            <ZapIcon className="size-6" />
            <span className="whitespace-nowrap">Create Session</span>
            <ArrowRightIcon className="size-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardWelcomeSection;
