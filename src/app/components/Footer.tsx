import { motion } from 'motion/react';
import { Facebook, Instagram} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-yellow-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <img src="/logo-icon.png" alt="Duba Logo" className="h-12 w-12 object-contain" />
                <div>
                  <div className="text-yellow-400 font-bold text-2xl" style={{ fontFamily: "'Yeseva One', serif" }}>DUBA</div>
                  <div className="text-gray-400 text-sm">Karaoke & Pub</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Elkins Park's favorite destination for Korean BBQ and karaoke entertainment.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block mx-auto text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://www.facebook.com/Dubakaraokepub/"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-yellow-400 flex items-center justify-center transition-colors group"
                >
                  <Facebook size={18} className="text-gray-400 group-hover:text-black" />
                </a>
                <a
                  href="https://www.instagram.com/dubakaraokepub/?hl=en"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-yellow-400 flex items-center justify-center transition-colors group"
                >
                  <Instagram size={18} className="text-gray-400 group-hover:text-black" />
                </a>

              </div>
              <p className="text-gray-400 text-sm mt-4">
                215-635-DUBA (3822)
              </p>
            </motion.div>
          </div>

          {/* Sister Restaurant Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <a
              href="https://duburestaurant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-2 border-yellow-400/50 rounded-lg hover:border-yellow-400 hover:bg-yellow-400/20 transition-all group"
            >
              <span className="text-yellow-400 font-semibold group-hover:text-yellow-300">
                Visit our sister restaurant: Dubu Restaurant
              </span>
              <svg
                className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-6 mt-8" />

          {/* Bottom Footer */}
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-sm">
              © {currentYear} Duba Lounge. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Must be 21+ to enter. Please drink responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
