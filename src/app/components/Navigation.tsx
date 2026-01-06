import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact-us', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-yellow-500/20 shadow-lg shadow-yellow-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <img 
                src="/logo-icon.png" 
                alt="Duba Logo" 
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:rotate-6" 
              />
              <div className="absolute inset-0 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                DUBA
              </div>
              <div className="text-xs text-gray-400">Pub & Karaoke</div>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                variant="ghost"
                className={`relative px-4 py-2 transition-colors ${
                  activeSection === item.id
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('contact-us')}
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium"
            >
              Reserve Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-yellow-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-yellow-500/20">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-3 px-4 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-gray-900 hover:text-yellow-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('contact-us')}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 mt-4"
                >
                  Reserve Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
