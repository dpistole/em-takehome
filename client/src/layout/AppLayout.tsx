import { Outlet } from "@tanstack/react-router";

export const AppLayout = () => {
  return (
    <main className="min-h-screen bg-slate-500">
      <div className="mx-auto max-w-screen-sm min-h-screen bg-neutral-100">
        <Outlet />
      </div>
    </main>
  );
};
