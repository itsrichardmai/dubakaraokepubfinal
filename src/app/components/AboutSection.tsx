import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Card } from './ui/card';
import { useEffect } from "react";
import { ElfsightWidget } from "./ElfsightWidget";


export function AboutSection() {
  const awards = [
    { year: '2024', title: 'Elkins Park Favorite', organization: 'Community Choice' },
    { year: '2024', title: 'Best Korean Restaurant', organization: 'Philadelphia Magazine' },
    { year: '2023', title: 'Top Karaoke Venue', organization: 'Nightlife Awards PA' },
    { year: '2023', title: 'Excellence in Service', organization: 'Restaurant Association' },
  ];
  useEffect(() => {
  if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://elfsightcdn.com/platform.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">ABOUT </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              DUBA
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-black border-yellow-500/20 backdrop-blur-sm p-8 md:p-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Step into the ultimate Korean entertainment experience where authentic K-BBQ meets state-of-the-art karaoke. 
                  At Duba, we've created a unique fusion destination that celebrates Korean culture, cuisine, and entertainment 
                  in the heart of Elkins Park, PA.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6"> Now featuring <span className="text-red-400 font-semibold">bb.q CHICKEN</span> - 
                  the No.1 Korean Chicken famous in 57 countries worldwide!
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We are a new state-of-the-art karaoke lounge with the finest karaoke entertainment equipment and an extensive library 
                  of Korean, English songs updated monthly. We feature 9 private rooms, each with unique themes and varying 
                  sizes for groups of 6 to 35. All rooms offer full bar service for your convenience.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With premium sound systems, comfortable seating, and a vibrant atmosphere, Duba is the perfect destination for 
                  celebrations, date nights, and unforgettable evenings with friends.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Awards Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Awards & Recognitions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-yellow-400/10 to-transparent border-yellow-500/30 p-6 h-full hover:border-yellow-400 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                          <Star className="text-yellow-400" size={24} fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-yellow-400 font-semibold text-sm mb-2">{award.year}</div>
                        <h4 className="text-white font-semibold text-lg mb-2">{award.title}</h4>
                        <p className="text-gray-400 text-sm">{award.organization}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reviews Widget */}
<div>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.6 }}
  >
    <Card className="bg-gradient-to-br from-gray-900/90 to-black border-yellow-500/20 p-8">
      <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
        What Our Guests Say
      </h3>
    </Card>
  </motion.div>

  {/* Widget loads lazily & safely */}
  <Card className="bg-gradient-to-br from-gray-900/90 to-black border-yellow-500/20 p-8 mt-6 min-h-[420px]">
    <ElfsightWidget widgetId="341b92ab-16d9-4556-8e6b-7c76a8999555" />
  </Card>
</div>

        </div>
      </div>
    </section>
  );
}


