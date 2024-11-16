import { Outlet } from "@tanstack/react-router";

export const AppLayout = () => {
  return (
    <main className="bg-pink-300 min-h-screen">
      <div className="mx-auto max-w-screen-sm bg-pink-400 min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};
