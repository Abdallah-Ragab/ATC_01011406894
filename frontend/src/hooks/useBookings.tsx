
import { useState, useEffect } from 'react';
import { Booking } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get bookings for current user
  const getUserBookings = async () => {
    if (!user) {
      setBookings([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/bookings/');
      const transformedBookings = response.data.results.map((item: any): Booking => ({
        id: item.id,
        eventId: item.event_id,
        userId: item.user_id,
        status: item.status,
        createdAt: item.created_at,
      }));
      setBookings(transformedBookings);
    } catch (err) {
      setError('Failed to fetch bookings.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has booked a specific event
  const hasUserBookedEvent = (eventId: string): boolean => {
    if (!user) return false;
    return bookings.some(booking =>
      Number(booking.eventId) === Number(eventId) &&
      booking.status === 'confirmed'
    );
  };

  // Create a new booking
  const bookEvent = async (eventId: string): Promise<Booking> => {
    if (!user) {
      throw new Error('User must be logged in to book an event');
    }

    try {
      const response = await api.post('/bookings/', { event_id: eventId });
      // Update local state with new booking
      setBookings(prev => [...prev, response.data]);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.message + (error.response?.data || '') || 'Generic error';
      throw new Error(errorMsg);
    };
  };

  const cancelBooking = async (bookingId: string): Promise<void> => {
    try {
      await api.delete(`/bookings/${bookingId}/`);

      // Update local state
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (error) {
      const errorMsg = (error as any).response?.data?.detail || 'Failed to cancel booking';
      throw new Error(errorMsg);
    }
  };

  // Load bookings when user changes
  useEffect(() => {
    getUserBookings();
  }, [user]);

  return {
    bookings,
    isLoading,
    error,
    getUserBookings,
    hasUserBookedEvent,
    bookEvent,
    cancelBooking
  };
};
