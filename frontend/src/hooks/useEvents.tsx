
import { useState, useEffect } from 'react';
import { Event } from '@/lib/types';
import api from '@/lib/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async (page = 1, limit = 10, search?: string, category?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (search) {
        params.append('search', search);
      }
      
      if (category) {
        params.append('category', category);
      }
      
      const response = await api.get(`/events/?${params.toString()}`);
      setEvents(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch events.');
      setIsLoading(false);
    }
  };

  const getEventById = async (id: string): Promise<Event> => {
    try {
      const response = await api.get(`/events/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Event not found');
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    try {
      const response = await api.post('/events/', eventData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create event');
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    try {
      const response = await api.patch(`/events/${id}/`, eventData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update event');
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    try {
      await api.delete(`/events/${id}/`);
    } catch (error) {
      throw new Error('Failed to delete event');
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
  };
};
