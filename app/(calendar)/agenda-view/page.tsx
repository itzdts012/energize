import { ClientContainer } from "@/calendar/components/client-container";
import { CalendarTasksSidebar } from "@/calendar/components/calendar-tasks-sidebar";

export default function Page() {
  return (
    <div className="flex h-[93vh] w-full overflow-hidden">
      <ClientContainer view="agenda" />
    </div>
  );
}
