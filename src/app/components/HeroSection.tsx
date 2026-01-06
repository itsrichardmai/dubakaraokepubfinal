import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />
      <div 
        className="absolute inset-0 opacity-30 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-background.jpg)',
        }}
      />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center z-10 relative pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.img 
            src="/logo-icon.png" 
            alt="Duba" 
            className="mx-auto mb-8 h-32 drop-shadow-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-4">
            Pub & Karaoke Lounge
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Good Food. Good Drinks. Good Vibes.
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400" />
            <p className="text-lg">Elkins Park's Favorite</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </motion.div>

        {/* BB.Q Chicken Promo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-red-900/30 to-black border-2 border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <ImageWithFallback
                src="/bbq-chicken-promo.png"
                alt="Introducing bb.q CHICKEN - No.1 Korean Chicken"
                className="w-full rounded-lg"
                width={800}
                height={400}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => scrollToSection('menu')}
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-6 text-lg group"
          >
            View Menu
            <motion.div
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </Button>
          <Button
            onClick={() => scrollToSection('contact-us')}
            size="lg"
            variant="outline"
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-6 text-lg"
          >
            Make Reservation
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-400/60 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
