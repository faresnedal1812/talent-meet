import { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardWelcomeSection from "../components/DashboardWelcomeSection";
import StatsCard from "../components/StatsCard";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const { user } = useUser();

  const createSessionMutation = useCreateSession();

  const { data: activeSessions, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: myRecentSessions, isLoading: loadingMyRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data._id}`);
        },
      },
    );
  };

  const activeSessionsCount = activeSessions?.length || [];
  const myRecentSessionsCount = myRecentSessions?.length || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;
    return (
      session?.host?.clerkId === user.id ||
      session?.participant?.clerkId === user.id
    );
  };

  return (
    <div className="min-h-screen bg-base-300 ">
      <Navbar />
      <DashboardWelcomeSection
        onCreateSession={() => setShowCreateModal(true)}
      />

      {/* GRID LAYOUT */}
      <div className="container px-6 pb-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatsCard
            activeSessionsCount={activeSessionsCount}
            myRecentSessionsCount={myRecentSessionsCount}
          />
          <ActiveSessions
            sessions={activeSessions}
            isLoading={loadingActiveSessions}
            isUserInSession={isUserInSession}
          />
        </div>
        <RecentSessions
          sessions={myRecentSessions}
          isLoading={loadingMyRecentSessions}
        />
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setRoomConfig({ problem: "", difficulty: "" });
        }}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </div>
  );
};

export default DashboardPage;
