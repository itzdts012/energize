import Link from "next/link";
import { Columns, Grid3x3, List, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TodayButton } from "@/calendar/components/header/today-button";
import { DateNavigator } from "@/calendar/components/header/date-navigator";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      {/* View Switcher Only */}
      <div className="flex items-center gap-1.5">
        <div className="inline-flex [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none">
          <Button
            asChild
            aria-label="View by day"
            size="icon"
            variant={view === "day" ? "default" : "outline"}
            className="rounded-r-none [&>svg]:size-5"
          >
            <Link href="/day-view">
              <List strokeWidth={1.8} />
            </Link>
          </Button>

          <Button
            asChild
            aria-label="View by week"
            size="icon"
            variant={view === "week" ? "default" : "outline"}
            className="-ml-px rounded-none [&>svg]:size-5"
          >
            <Link href="/week-view">
              <Columns strokeWidth={1.8} />
            </Link>
          </Button>

          <Button
            asChild
            aria-label="View by month"
            size="icon"
            variant={view === "month" ? "default" : "outline"}
            className="-ml-px rounded-none [&>svg]:size-5"
          >
            <Link href="/month-view">
              <Grid2x2 strokeWidth={1.8} />
            </Link>
          </Button>

          <Button
            asChild
            aria-label="View by year"
            size="icon"
            variant={view === "year" ? "default" : "outline"}
            className="-ml-px rounded-none [&>svg]:size-5"
          >
            <Link href="/year-view">
              <Grid3x3 strokeWidth={1.8} />
            </Link>
          </Button>

          <Button
            asChild
            aria-label="View by agenda"
            size="icon"
            variant={view === "agenda" ? "default" : "outline"}
            className="-ml-px rounded-l-none [&>svg]:size-5"
          >
            <Link href="/agenda-view">
              <CalendarRange strokeWidth={1.8} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
