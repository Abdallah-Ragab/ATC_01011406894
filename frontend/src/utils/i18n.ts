
import { Language } from '@/lib/types';

type TranslationKeys = 
  | 'appName'
  | 'home'
  | 'events'
  | 'login'
  | 'logout'
  | 'register'
  | 'admin'
  | 'myBookings'
  | 'bookNow'
  | 'booked'
  | 'eventDetails'
  | 'eventName'
  | 'description'
  | 'category'
  | 'date'
  | 'venue'
  | 'price'
  | 'congratulations'
  | 'bookingSuccess'
  | 'backToHome'
  | 'email'
  | 'password'
  | 'name'
  | 'createEvent'
  | 'updateEvent'
  | 'deleteEvent'
  | 'tags'
  | 'submit'
  | 'cancel'
  | 'addEvent'
  | 'viewEventDetails'
  | 'successfullyBooked'
  | 'allRightsReserved'
  | 'madeWith'
  | 'lightMode'
  | 'darkMode'
  | 'eventsNotFound'
  | 'all'
  | 'searchingForEvents'
  ;

type Translations = {
  [key in Language]: {
    [key in TranslationKeys]: string;
  };
};

export const translations: Translations = {
  en: {
    appName: 'Eventista',
    home: 'Home',
    events: 'Events',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    admin: 'Admin',
    myBookings: 'My Bookings',
    bookNow: 'Book Now',
    booked: 'Booked',
    eventDetails: 'Event Details',
    eventName: 'Event Name',
    description: 'Description',
    category: 'Category',
    date: 'Date',
    venue: 'Venue',
    price: 'Price',
    congratulations: 'Congratulations!',
    bookingSuccess: 'Your booking has been confirmed.',
    backToHome: 'Back to Home',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    createEvent: 'Create Event',
    updateEvent: 'Update Event',
    deleteEvent: 'Delete Event',
    tags: 'Tags',
    submit: 'Submit',
    cancel: 'Cancel',
    addEvent: 'Add Event',
    viewEventDetails: 'View event details',
    successfullyBooked: 'You have successfully booked:',
    allRightsReserved: 'All rights reserved.',
    madeWith: 'Made with 🫶 by Abdallah Sameh for AREEB Internship',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    eventsNotFound: 'No events found matching your criteria.',
    all: 'All',
    searchingForEvents: 'Searching for events...',
  },
  ar: {
    appName: 'إيفنتيستا',
    home: 'الرئيسية',
    events: 'الفعاليات',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    register: 'إنشاء حساب',
    admin: 'الإدارة',
    myBookings: 'حجوزاتي',
    bookNow: 'احجز الآن',
    booked: 'محجوز',
    eventDetails: 'تفاصيل الفعالية',
    eventName: 'اسم الفعالية',
    description: 'الوصف',
    category: 'الفئة',
    date: 'التاريخ',
    venue: 'المكان',
    price: 'السعر',
    congratulations: 'تهانينا!',
    bookingSuccess: 'تم تأكيد الحجز الخاص بك.',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    createEvent: 'إنشاء فعالية',
    updateEvent: 'تحديث الفعالية',
    deleteEvent: 'حذف الفعالية',
    tags: 'العلامات',
    submit: 'إرسال',
    cancel: 'إلغاء',
    addEvent: 'إضافة فعالية',
    viewEventDetails: 'عرض تفاصيل الفعالية',
    successfullyBooked: 'لقد حجزت بنجاح:',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    madeWith: 'صنع بكل 🫶 بواسطة عبد الله سامح لتدريب AREEB',
    lightMode: 'الوضع الساطع',
    darkMode: 'الوضع المظلم',
    eventsNotFound: 'لم يتم العثور على فعاليات تطابق معاييرك.',
    all: 'الكل',
    searchingForEvents: 'البحث عن الفعاليات...',
  }
};

export const getTranslation = (key: TranslationKeys, language: Language): string => {
  return translations[language][key];
};
