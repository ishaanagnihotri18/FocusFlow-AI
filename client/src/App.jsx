import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AIPlanner from "./pages/AIPlanner";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            PROTECTED APPLICATION
        ========================== */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/ai-planner"
            element={<AIPlanner />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        newestOnTop
      />

    </BrowserRouter>
  );
}

export default App;