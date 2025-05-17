
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import EventForm from "@/components/EventForm";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/lib/types";
import { translations } from "@/utils/i18n";

const Admin = () => {
  const { user, isAuthenticated, language } = useAuth();
  const { events, getEvents, createEvent, updateEvent, deleteEvent } = useEvents();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const t = translations[language];

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate("/");
      toast({
        title: language === 'en' ? "Access Denied" : "تم رفض الوصول",
        description: language === 'en' 
          ? "You do not have permission to access the admin panel."
          : "ليس لديك إذن للوصول إلى لوحة المشرف.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, user, navigate, toast, language]);

  const handleCreateEvent = async (eventData: Omit<Event, "id">) => {
    try {
      await createEvent(eventData);
      getEvents();
      setIsCreateDialogOpen(false);
      toast({
        title: language === 'en' ? "Success" : "نجاح",
        description: language === 'en' ? "Event created successfully." : "تم إنشاء الفعالية بنجاح.",
      });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Failed to create event." : "فشل في إنشاء الفعالية.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateEvent = async (eventData: Omit<Event, "id">) => {
    if (!selectedEvent) return;
    
    try {
      await updateEvent(selectedEvent.id, eventData);
      getEvents();
      setIsEditDialogOpen(false);
      setSelectedEvent(null);
      toast({
        title: language === 'en' ? "Success" : "نجاح",
        description: language === 'en' ? "Event updated successfully." : "تم تحديث الفعالية بنجاح.",
      });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Failed to update event." : "فشل في تحديث الفعالية.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      await deleteEvent(selectedEvent.id);
      getEvents();
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
      toast({
        title: language === 'en' ? "Success" : "نجاح",
        description: language === 'en' ? "Event deleted successfully." : "تم حذف الفعالية بنجاح.",
      });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Failed to delete event." : "فشل في حذف الفعالية.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{language === 'en' ? 'Admin Panel' : 'لوحة الإدارة'}</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t.addEvent}
          </Button>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t.events}</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.eventName}</TableHead>
                    <TableHead>{t.date}</TableHead>
                    <TableHead>{t.venue}</TableHead>
                    <TableHead>{t.price}</TableHead>
                    <TableHead>{t.category}</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          {new Date(event.date).toLocaleDateString(
                            language === 'en' ? 'en-US' : 'ar-EG'
                          )}
                        </TableCell>
                        <TableCell>{event.venue}</TableCell>
                        <TableCell>${event.price}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(event)}
                              aria-label="Edit event"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(event)}
                              aria-label="Delete event"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        {language === 'en' 
                          ? 'No events found. Create your first event to get started.'
                          : 'لم يتم العثور على فعاليات. قم بإنشاء أول فعالية للبدء.'
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        {/* Create Event Dialog */}
        <Dialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t.createEvent}</DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Fill in the details to create a new event.'
                  : 'املأ التفاصيل لإنشاء فعالية جديدة.'
                }
              </DialogDescription>
            </DialogHeader>
            <EventForm 
              onSubmit={handleCreateEvent} 
              buttonText={t.submit} 
            />
          </DialogContent>
        </Dialog>
        
        {/* Edit Event Dialog */}
        <Dialog 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t.updateEvent}</DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Update the details of this event.'
                  : 'تحديث تفاصيل هذه الفعالية.'
                }
              </DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <EventForm 
                onSubmit={handleUpdateEvent} 
                initialData={selectedEvent} 
                buttonText={t.submit} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Event Dialog */}
        <AlertDialog 
          open={isDeleteDialogOpen} 
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.deleteEvent}</AlertDialogTitle>
              <AlertDialogDescription>
                {language === 'en' 
                  ? 'Are you sure you want to delete this event? This action cannot be undone.'
                  : 'هل أنت متأكد أنك تريد حذف هذه الفعالية؟ لا يمكن التراجع عن هذا الإجراء.'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEvent} className="bg-destructive">
                {t.deleteEvent}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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

export default Admin;
