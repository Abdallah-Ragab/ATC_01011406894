from django.core.management.base import BaseCommand
from api.models import Event, User
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Creates sample data for the application'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Creating sample data...'))
        
        # Create admin user
        try:
            admin, created = User.objects.get_or_create(
                email='admin@example.com',
                defaults={
                    'name': 'Admin User',
                    'role': 'admin',
                    'is_staff': True,
                    'is_superuser': True
                }
            )
            
            if created:
                admin.set_password('password')
                admin.save()
                self.stdout.write(self.style.SUCCESS("Admin user created"))
            else:
                self.stdout.write(self.style.SUCCESS("Admin user already exists"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error creating admin user: {e}"))
        
        # Create regular user
        try:
            user, created = User.objects.get_or_create(
                email='user@example.com',
                defaults={
                    'name': 'Regular User',
                    'role': 'user'
                }
            )
            
            if created:
                user.set_password('password')
                user.save()
                self.stdout.write(self.style.SUCCESS("Regular user created"))
            else:
                self.stdout.write(self.style.SUCCESS("Regular user already exists"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error creating regular user: {e}"))
        
        # Create sample events
        events_data = [
            {
                "title": "Summer Music Festival",
                "description": "A weekend of amazing performances from top artists across the globe.",
                "date": (datetime.now() + timedelta(days=60)).isoformat(),
                "venue": "Central Park, New York",
                "price": 120,
                "category": "Music",
                "image": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "tags": ["music", "festival", "summer"]
            },
            {
                "title": "Tech Conference 2025",
                "description": "Learn about the latest technology trends and network with industry professionals.",
                "date": (datetime.now() + timedelta(days=120)).isoformat(),
                "venue": "Convention Center, San Francisco",
                "price": 350,
                "category": "Technology",
                "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "tags": ["tech", "conference", "networking"]
            },
            {
                "title": "International Food Festival",
                "description": "Sample delicious cuisines from around the world.",
                "date": (datetime.now() + timedelta(days=90)).isoformat(),
                "venue": "Downtown Square, Chicago",
                "price": 45,
                "category": "Food",
                "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "tags": ["food", "festival", "international"]
            },
            {
                "title": "Business Leadership Summit",
                "description": "Join top executives for discussions on leadership and business growth.",
                "date": (datetime.now() + timedelta(days=150)).isoformat(),
                "venue": "Grand Hotel, London",
                "price": 500,
                "category": "Business",
                "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "tags": ["business", "leadership", "summit"]
            }
        ]
        
        events_created = 0
        for event_data in events_data:
            if not Event.objects.filter(title=event_data["title"]).exists():
                try:
                    Event.objects.create(**event_data)
                    events_created += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error creating event {event_data['title']}: {e}"))
        
        self.stdout.write(self.style.SUCCESS(f"{events_created} events created"))
