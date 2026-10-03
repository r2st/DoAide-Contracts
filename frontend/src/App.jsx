import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Shell from "./components/Shell";
import { SkeletonPanel } from "./components/Skeleton";
import { useAuth } from "./hooks/useAuth";
import ContractViewPage from "./pages/ContractViewPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GeneratorPage from "./pages/GeneratorPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyTemplatesPage from "./pages/MyTemplatesPage";
import PricingPage from "./pages/PricingPage";
import RegisterPage from "./pages/RegisterPage";
import ReviewPage from "./pages/ReviewPage";
import SettingsPage from "./pages/SettingsPage";
import TemplateLibraryPage from "./pages/TemplateLibraryPage";
import UploadPage from "./pages/UploadPage";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="shell-main">
        <SkeletonPanel lines={5} label="Checking your session" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Shell>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Shell>
  );
}

function Home() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="shell-main">
        <SkeletonPanel lines={5} label="Checking your session" />
      </div>
    );
  }
  if (!user) return <LandingPage />;
  return (
    <Shell>
      <ErrorBoundary>
        <DashboardPage />
      </ErrorBoundary>
    </Shell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route
        path="/review/upload"
        element={<Protected><UploadPage /></Protected>}
      />
      <Route
        path="/review/:id"
        element={<Protected><ReviewPage /></Protected>}
      />
      <Route
        path="/generate"
        element={<Protected><TemplateLibraryPage /></Protected>}
      />
      <Route
        path="/generate/:templateId"
        element={<Protected><GeneratorPage /></Protected>}
      />
      <Route
        path="/contract/:id"
        element={<Protected><ContractViewPage /></Protected>}
      />
      <Route
        path="/templates"
        element={<Protected><MyTemplatesPage /></Protected>}
      />
      <Route
        path="/settings"
        element={<Protected><SettingsPage /></Protected>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
