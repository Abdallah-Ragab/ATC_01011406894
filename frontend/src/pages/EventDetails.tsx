
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, MapPin, DollarSign, Tag, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/hooks/useEvents";
import { useBookings } from "@/hooks/useBookings";
import { translations } from "@/utils/i18n";
import { Event } from "@/lib/types";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const { hasUserBookedEvent, bookEvent } = useBookings();
  const { isAuthenticated, language } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  
  const t = translations[language];
  const isBooked = id ? hasUserBookedEvent(id) : false;

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const eventData = await getEventById(id);
          setEvent(eventData);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load event details.",
            variant: "destructive",
          });
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchEvent();
  }, [id]);

  const handleBookEvent = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!event) return;
    
    setIsBooking(true);
    
    try {
      await bookEvent(event.id);
      navigate("/booking-success", { state: { eventId: event.id, eventName: event.title } });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to book this event. Please try again. msg: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {isLoading ? (
          <div className="container py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-[400px] bg-muted rounded-lg animate-pulse-light mb-8"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse-light w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse-light"></div>
                <div className="h-4 bg-muted rounded animate-pulse-light"></div>
                <div className="h-4 bg-muted rounded animate-pulse-light w-2/3"></div>
              </div>
            </div>
          </div>
        ) : event ? (
          <>
            {/* Hero Section with Event Image */}
            <div className="relative h-64 md:h-96 w-full bg-gradient-to-r from-primary/30 to-purple-400/30 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
            
            <div className="container py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <Link
                  to="/"
                  className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 rtl-mirror" />
                  <span>
                    {language === 'en' ? 'Back to all events' : 'العودة إلى جميع الفعاليات'}
                  </span>
                </Link>
                
                <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{format(new Date(event.date), 'PPP')}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>${event.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isBooked ? (
                    <Badge className="text-sm py-2 px-4" variant="secondary">
                      ✓ {t.booked}
                    </Badge>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-event hover:bg-event-hover text-event-foreground"
                      onClick={handleBookEvent}
                      disabled={isBooking}
                    >
                      {isBooking
                        ? language === 'en' ? 'Processing...' : 'جاري المعالجة...'
                        : t.bookNow
                      }
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="outline" className="font-medium">
                    {event.category}
                  </Badge>
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-medium">
                      <Tag className="h-3 w-3 mr-1 text-primary" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2>{t.description}</h2>
                  <p className="whitespace-pre-line">{event.description}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container py-12 px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Event not found</h2>
            <p className="text-muted-foreground mb-6">
              {language === 'en'
                ? 'The event you are looking for does not exist or has been removed.'
                : 'الفعالية التي تبحث عنها غير موجودة أو تمت إزالتها.'
              }
            </p>
            <Button asChild>
              <Link to="/">{t.backToHome}</Link>
            </Button>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex justify-center px-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Eventista. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetails;
