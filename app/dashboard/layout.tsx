// app/dashboard/layout.tsx
import SideNav from '../ui/dashboard/sidenav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen"> {/* ✅ Tambah min-h-screen */}
      <div className="w-64">
        <SideNav />
      </div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
