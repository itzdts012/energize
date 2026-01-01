"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/lib/storage"; // Import your Electron bridge
import type { Dispatch, SetStateAction } from "react";
import type { IEvent, IUser } from "@/calendar/interfaces";
import type { TBadgeVariant, TVisibleHours, TWorkingHours } from "@/calendar/types";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  selectedUserId: IUser["id"] | "all";
  setSelectedUserId: (userId: IUser["id"] | "all") => void;
  badgeVariant: TBadgeVariant;
  setBadgeVariant: (variant: TBadgeVariant) => void;
  users: IUser[];
  workingHours: TWorkingHours;
  setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>;
  visibleHours: TVisibleHours;
  setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>;
  events: IEvent[];
  setLocalEvents: Dispatch<SetStateAction<IEvent[]>>;
  // Added helper methods for easier usage in components
  createEvent: (event: Partial<IEvent>) => void;
  updateEvent: (id: string, updates: Partial<IEvent>) => void;
  deleteEvent: (id: string) => void;
}

const CalendarContext = createContext({} as ICalendarContext);

const WORKING_HOURS = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
};

const VISIBLE_HOURS = { from: 7, to: 18 };

export function CalendarProvider({ children, users, events: initialEvents }: { children: React.ReactNode; users: IUser[]; events: IEvent[] }) {
  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored");
  const [visibleHours, setVisibleHours] = useState<TVisibleHours>(VISIBLE_HOURS);
  const [workingHours, setWorkingHours] = useState<TWorkingHours>(WORKING_HOURS);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"] | "all">("all");

  // State to hold events
  const [localEvents, setLocalEvents] = useState<IEvent[]>(initialEvents || []);
  // Flag to ensure we don't save to disk before we've loaded from disk
  const [isInitialized, setIsInitialized] = useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  // ---------------------------------------------------------
  // 1. ELECTRON: LOAD DATA ON STARTUP
  // ---------------------------------------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const savedEvents = await storage.getEvents();
        console.log("Loaded from disk:", savedEvents);
        
        // If we have data on disk, use it. Otherwise use initialEvents.
        if (savedEvents && savedEvents.length > 0) {
          // We must ensure dates are parsed back into Date objects if they were saved as strings
          const parsedEvents = savedEvents.map((e: any) => ({
             ...e,
             // Fix dates that turned into strings during JSON storage
             startDate: typeof e.startDate === 'string' ? e.startDate : e.startDate, // Keep as string or Date depending on your interface. 
             // Ideally keep them as ISO strings in IEvent to match JSON.
          }));
          setLocalEvents(parsedEvents);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setIsInitialized(true); // Mark as ready so saving is enabled
      }
    }
    loadData();
  }, []);

  // ---------------------------------------------------------
  // 2. ELECTRON: SAVE DATA ON CHANGE
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isInitialized) return; // Don't save empty array over existing data on boot

    const saveData = async () => {
      console.log("Saving to disk:", localEvents);
      await storage.saveEvents(localEvents);
    };

    const timeout = setTimeout(saveData, 500); // Debounce save (wait 500ms after last change)
    return () => clearTimeout(timeout);
  }, [localEvents, isInitialized]);

  // ---------------------------------------------------------
  // 3. HELPER METHODS (CRUD)
  // ---------------------------------------------------------
  
  const createEvent = (eventData: Partial<IEvent>) => {
    // Generate a random ID since we don't have a database
    const newId = Math.random().toString(36).substr(2, 9);
    const newEvent = { ...eventData, id: newId } as IEvent;
    setLocalEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updates: Partial<IEvent>) => {
    setLocalEvents((prev) => 
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setLocalEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant,
        users,
        visibleHours,
        setVisibleHours,
        workingHours,
        setWorkingHours,
        events: localEvents,
        setLocalEvents,
        // Expose new helpers
        createEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}