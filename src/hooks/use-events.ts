'use client';
import { useState, useEffect } from 'react';

// Define Event type matching your Prisma schema
interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
  isLocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  attachments?: any[];
}

export function useEvents(startDate: Date, endDate: Date) {
  const [events, setEvents] = useState<Event[]>([]);  // ← Fixed typing
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events?start=${startDate.toISOString()}&end=${endDate.toISOString()}`)
      .then((res) => res.json())
      .then((data: Event[]) => {  // ← Explicit type
        setEvents(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [startDate, endDate]);

  const createEvent = async (event: Omit<Event, 'id'>) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    const newEvent: Event = await res.json();
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const res = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updated: Event = await res.json();
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
  };

  const deleteEvent = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return { events, loading, createEvent, updateEvent, deleteEvent };
}
