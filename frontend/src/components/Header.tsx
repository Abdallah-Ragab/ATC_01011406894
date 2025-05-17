
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { translations } from "@/utils/i18n";
import { useState } from "react";

const Header = () => {
  const { user, isAuthenticated, logout, theme, toggleTheme, language, setLanguage } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const t = translations[language];
  const isRTL = language === 'ar';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            {t.appName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              {t.home}
            </Link>
            
            {isAuthenticated && user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {t.admin}
              </Link>
            )}
          </div>

          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 mr-6' : 'space-x-3 ml-6'}`}>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex-shrink-0"
            >
              <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              className="flex-shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={logout} className="flex-shrink-0">
                <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2 rtl-mirror' : 'mr-2'}`} />
                {t.logout}
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                  <Link to="/login">
                    <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.login}
                  </Link>
                </Button>
                
                <Button asChild variant="default" size="sm" className="flex-shrink-0">
                  <Link to="/register">
                    {t.register}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-2 py-1 text-foreground/80 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            
            {isAuthenticated && user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="px-2 py-1 text-foreground/80 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.admin}
              </Link>
            )}
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              >
                <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                {theme === 'dark' ? t.lightMode : t.darkMode}
              </Button>
              
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2 rtl-mirror' : 'mr-2'}`} />
                  {t.logout}
                </Button>
              ) : (
                <>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/login">
                      <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.login}
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/register">
                      {t.register}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
