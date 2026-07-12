import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminGate = () => {
  const { session, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-charcoal text-concrete">Ładowanie…</div>;
  }
  return session ? <AdminDashboard /> : <AdminLogin />;
};

const Admin = () => (
  <AuthProvider>
    <AdminGate />
  </AuthProvider>
);

export default Admin;
