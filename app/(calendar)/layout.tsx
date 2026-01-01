import { Settings } from "lucide-react";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { getEvents, getUsers } from "@/calendar/requests";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);

  return (
    <CalendarProvider users={users} events={events}>
      {/* Full viewport layout */}
      <div className="flex h-screen overflow-hidden">
        {children}
      </div>
    </CalendarProvider>
  );
}
