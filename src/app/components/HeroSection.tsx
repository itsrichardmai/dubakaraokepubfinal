import { motion } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'image' as const,
      src: '/friday-night-public-karaoke-promo.webp',
      alt: 'Friday Night Public Karaoke',
    },
    {
      type: 'image' as const,
      src: '/bbq-chicken-promo.webp',
      alt: 'BB.Q Chicken Promo',
    },
    {
      type: 'custom' as const,
      content: (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
          <img
            src="/korean-food-collage.png"
            alt="Korean Food Collage"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/60 rounded-lg" />
          <div className="relative z-10 text-center px-6 py-8">
            <p className="text-white text-2xl md:text-3xl font-semibold mb-6 max-w-2xl">
              Check out our sister restaurant for award winning authentic Korean cuisine
            </p>
            <a
              href="https://duburestaurant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Visit Dubu Restaurant
            </a>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />
      <div 
        className="absolute inset-0 opacity-30 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-background.jpg)',
        }}
      /> */}

      {/* plain black background */}
      <div className="absolute inset-0 bg-black z-0" />
      
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
            src="/logo-icon.webp" 
            alt="Duba" 
            className="mx-auto mb-8 h-32 drop-shadow-2xl"
            fetchPriority="high"
            width={281}
            height={150}
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
          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "'Yeseva One', serif" }}
          >
            Karaoke & Pub
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

        {/* Promo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-yellow-900/20 to-black border-2 border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
              {/* Carousel Content */}
              <div className="relative overflow-hidden rounded-lg">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    {slide.type === 'image' ? (
                      <ImageWithFallback
                        eager={index === 0}
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full rounded-lg"
                        width={800}
                        height={400}
                      />
                    ) : (
                      slide.content
                    )}
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={previousSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-400 rounded-full p-2 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-400 rounded-full p-2 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-yellow-400 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
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
