import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryItems = [
  { type: 'image', url: '/gallery/galleryimg0.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg1.jpg', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg2.jpg', title: 'BBQ Chicken' },
  { type: 'image', url: '/gallery/galleryimg3.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg4.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg5.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg6.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg7.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg8.png', title: 'Karaoke Room' },
  { type: 'image', url: '/gallery/galleryimg9.png', title: 'Karaoke Room' },
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Gallery
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="bg-black border-yellow-500/20 overflow-hidden">
              <div className="relative aspect-video group cursor-pointer" onClick={() => openModal(currentIndex)}>
                <ImageWithFallback
                  src={galleryItems[currentIndex].url}
                  alt={galleryItems[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1200}
                  height={675}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Navigation */}
                <Button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-yellow-400/10 to-transparent">
                <h3 className="text-white font-semibold text-xl">{galleryItems[currentIndex].title}</h3>
                <p className="text-gray-400 text-sm">
                  {currentIndex + 1} / {galleryItems.length}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {galleryItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openModal(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-yellow-400 ring-2 ring-yellow-400/50'
                    : 'border-transparent hover:border-yellow-400/50'
                }`}
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:text-yellow-400 z-10"
            >
              <X size={32} />
            </Button>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={galleryItems[currentIndex].url}
                alt={galleryItems[currentIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                width={1920}
                height={1080}
              />
              
              <Button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black"
              >
                <ChevronLeft size={32} />
              </Button>
              <Button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black"
              >
                <ChevronRight size={32} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
