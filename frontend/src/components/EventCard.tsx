
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/types";
import { useBookings } from "@/hooks/useBookings";
import { useAuth } from "@/context/AuthContext";
import { translations } from "@/utils/i18n";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { hasUserBookedEvent } = useBookings();
  const { isAuthenticated, language } = useAuth();
  const isBooked = hasUserBookedEvent(event.id);
  
  const t = translations[language];
  const isRTL = language === 'ar';
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-0 right-0 p-2">
          <Badge variant="secondary" className="font-medium">
            ${event.price}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="font-bold text-white text-xl truncate">
            {event.title}
          </h3>
          <div className="flex items-center text-xs text-white/90 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{event.venue}</span>
        </div>
        
        <p className="line-clamp-2 text-sm mb-3 h-10">
          {event.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {event.tags.map((tag) => (
            <div 
              key={tag}
              className="text-xs inline-flex items-center gap-2 bg-muted rounded-full px-2 py-0.5"
            >
              <Tag className={`h-3 w-3 ${isRTL ? 'ml-0' : 'mr-0'} flex-shrink-0`} />
              <span className="inline-block">{tag}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Link 
          to={`/events/${event.id}`}
          className="text-sm text-primary hover:underline"
        >
          {t.eventDetails}
        </Link>
        
        <div className="flex-shrink-0">
          {isAuthenticated ? (
            isBooked ? (
              <Badge variant="secondary">
                ✓ {t.booked}
              </Badge>
            ) : (
              <Button 
                asChild
                variant="default" 
                size="sm"
                className="bg-event hover:bg-event-hover text-event-foreground"
              >
                <Link to={`/events/${event.id}`}>
                  {t.bookNow}
                </Link>
              </Button>
            )
          ) : (
            <Button 
              asChild
              variant="default" 
              size="sm"
              className="bg-event hover:bg-event-hover text-event-foreground"
            >
              <Link to="/login">
                {t.bookNow}
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
