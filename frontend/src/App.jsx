import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import { useUser } from "@clerk/clerk-react";
import LoadingSpinner from "./components/LoadingSpinner";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems/:id"
          element={isSignedIn ? <ProblemDetailsPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
};

export default App;
