import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
  TrophyIcon,
} from "lucide-react";

const StatsCard = ({ activeSessionsCount, myRecentSessionsCount }) => {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6 ">
      {/* ACTIVE COUNT */}
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/60 transition-colors duration-100">
        <div className="card-body flex flex-col justify-between">
          <div className="flex items-center justify-between gap-6">
            <div className="size-12 flex items-center justify-center bg-primary/10 rounded-xl">
              <UsersIcon className="size-5 text-primary/90" />
            </div>
            <div className="badge badge-md badge-success font-medium">Live</div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-black text-base-content text-3xl">
              {activeSessionsCount}
            </span>
            <span className="font-medium text-sm text-base-content/70">
              Active Sessions
            </span>
          </div>
        </div>
      </div>
      {/* RECENT COUNT */}
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/60 transition-colors duration-100">
        <div className="card-body flex flex-col justify-between">
          <div className="flex items-center justify-between gap-6">
            <div className="size-12 flex items-center justify-center bg-primary/10 rounded-xl">
              <TrophyIcon className="size-5 text-primary/90" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-black text-base-content text-3xl">
              {myRecentSessionsCount}
            </span>
            <span className="font-medium text-sm text-base-content/70">
              Total Sessions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
