import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import { useUser } from "@clerk/clerk-react";
import LoaderSpinner from "./components/LoaderSpinner";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <LoaderSpinner />;
  return (
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
    </Routes>
  );
};

export default App;
