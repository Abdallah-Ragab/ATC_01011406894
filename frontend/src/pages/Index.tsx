
import { useState } from "react";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { translations } from "@/utils/i18n";

const Index = () => {
  const { events, isLoading } = useEvents();
  const { language } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const t = translations[language];

  // Get unique categories
  const categories = Array.from(
    new Set(events.map((event) => event.category))
  );

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === null || event.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/20 to-purple-400/20 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                {language === 'en' ? 'Discover Amazing Events Near You' : 'اكتشف فعاليات رائعة بالقرب منك'}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl text-balance">
                {language === 'en' 
                  ? 'Browse and book tickets for the hottest concerts, workshops, conferences, and more.'
                  : 'تصفح واحجز تذاكر لأفضل الحفلات الموسيقية وورش العمل والمؤتمرات والمزيد.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchingForEvents}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t.all}
                </Button>
                
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
              {selectedCategory 
                ? `${selectedCategory} ${t.events}`
                : t.events
              }
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-lg border border-border p-1 h-[340px]">
                    <div className="h-48 bg-muted rounded-t-md animate-pulse-light"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-muted rounded animate-pulse-light w-3/4"></div>
                      <div className="h-4 bg-muted rounded animate-pulse-light"></div>
                      <div className="h-4 bg-muted rounded animate-pulse-light w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {t.eventsNotFound}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            © 2025 Eventista. {t.allRightsReserved}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.madeWith}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
