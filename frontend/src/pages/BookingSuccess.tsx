
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { translations } from "@/utils/i18n";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, language } = useAuth();
  
  const t = translations[language];
  
  // Get event info from location state
  const eventId = location.state?.eventId;
  const eventName = location.state?.eventName;
  
  useEffect(() => {
    // Redirect to home if no event info or not authenticated
    if (!eventId || !isAuthenticated) {
      navigate("/");
    }
  }, [eventId, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold">{t.congratulations}</h1>
          
          <p className="text-xl">{t.bookingSuccess}</p>
          
          {eventName && (
            <p className="text-muted-foreground">
              {t.successfullyBooked} {eventName}
            </p>
          )}
          
          <div className="pt-4">
            <Button asChild>
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className={language === 'ar' ? 'rtl-mirror ml-2' : 'mr-2'} />
                {t.backToHome}
              </Link>
            </Button>
          </div>
          
          {eventId && (
            <div>
              <Link 
                to={`/events/${eventId}`} 
                className="text-primary hover:underline text-sm"
              >
                {t.viewEventDetails}
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex justify-center px-4">
          <p className="text-sm text-muted-foreground">
            © 2025 EventBooker. {t.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BookingSuccess;
