from rest_framework import serializers
from .models import User, Event, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role']
        read_only_fields = ['id']
        extra_kwargs = {'role': {'required': False}}
    
    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'venue', 'price', 'category', 'image', 'tags']
        read_only_fields = ['id']

class BookingSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(source='event', queryset=Event.objects.all())
    
    class Meta:
        model = Booking
        fields = ['id', 'user_id', 'event_id', 'created_at', 'status']
        read_only_fields = ['id', 'user_id', 'created_at']

    def create(self, validated_data):
        # Get the current user from the context
        user = self.context['request'].user
        
        # Check if booking already exists
        existing_booking = Booking.objects.filter(
            user=user,
            event=validated_data['event']
        ).first()
        
        if existing_booking:
            if existing_booking.status == 'cancelled':
                # If it was cancelled, reactivate it
                existing_booking.status = 'confirmed'
                existing_booking.save()
                return existing_booking
            raise serializers.ValidationError("You have already booked this event")
        
        # Create new booking
        booking = Booking.objects.create(
            user=user,
            event=validated_data['event']
        )
        return booking
