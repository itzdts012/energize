import { useMemo } from "react";
import { addMonths, startOfYear } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { YearViewMonth } from "@/calendar/components/year-view/year-view-month";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  allEvents: IEvent[];
}

export function CalendarYearView({ allEvents }: IProps) {
  const { selectedDate } = useCalendar();

  const months = useMemo(() => {
    const yearStart = startOfYear(selectedDate);
    return Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i));
  }, [selectedDate]);

  return (
    <ScrollArea className="h-full w-full">
    <div className="p-6 pb-45 space y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {months.map(month => (
          <YearViewMonth key={month.toString()} month={month} events={allEvents} />
        ))}
      </div>
    </div>
    </ScrollArea>
  );
}
