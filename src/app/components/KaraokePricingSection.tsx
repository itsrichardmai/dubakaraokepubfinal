import { motion } from 'motion/react';
import { Mic2, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { karaokeRooms, karaokeRooms2 } from '../data/menuData';

export function KaraokePricingSection() {
  return (
    <section id="karaoke-pricing" className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Yeseva One', serif" }}>
            <span className="text-white">KARAOKE </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">PRICING</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
        </motion.div>

        <Tabs defaultValue="karaoke" className="max-w-7xl mx-auto">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide mb-8 bg-gray-900/50 border border-yellow-500/20">
            <TabsTrigger value="karaoke" className="flex-shrink-0 whitespace-nowrap text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Mic2 className="mr-2 h-4 w-4" />
              Karaoke (Weekend)
            </TabsTrigger>
            <TabsTrigger value="karaokeweekday" className="flex-shrink-0 whitespace-nowrap text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Mic2 className="mr-2 h-4 w-4" />
              Karaoke (Weekday)
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex-shrink-0 whitespace-nowrap text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Users className="mr-2 h-4 w-4" />
              Packages (Weekend)
            </TabsTrigger>
          </TabsList>

          {/* Karaoke Weekend Tab */}
          <TabsContent value="karaoke">
            <Card className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-500/30 p-8">
              <h3 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                Karaoke Rooms (노래방)
              </h3>
              <p className="text-gray-300 text-center">
               Weekend Pricing (Friday & Saturday)
              </p>
              <p className="text-gray-300 mb-6 text-center">
               9 Private Themed Rooms • Korean, English & Chinese Songs • Full Bar Service
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {karaokeRooms.map((room, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-black/40 border-yellow-500/30 p-6 text-center hover:border-yellow-400 transition-all">
                      <Mic2 className="mx-auto mb-3 text-yellow-400" size={32} />
                      <h4 className="text-white font-bold text-xl mb-2">{room.name}</h4>
                      <p className="text-gray-400 text-sm mb-1">Max Capacity: {room.capacity}</p>
                      <p className="text-yellow-400 font-bold text-lg">{room.price}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-gray-400 mt-8 text-sm">
                * Song library updated monthly. Call for availability.
              </p>
            </Card>
          </TabsContent>

          {/* Karaoke Weekday Tab */}
          <TabsContent value="karaokeweekday">
            <Card className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-500/30 p-8">
              <h3 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                Karaoke Rooms (노래방)
              </h3>
              <p className="text-gray-300 text-center">
               Weekday Pricing (Sunday - Thursday)
              </p>
              <p className="text-gray-300 mb-6 text-center">
               9 Private Themed Rooms • Korean, English & Chinese Songs • Full Bar Service
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {karaokeRooms2.map((room, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-black/40 border-yellow-500/30 p-6 text-center hover:border-yellow-400 transition-all">
                      <Mic2 className="mx-auto mb-3 text-yellow-400" size={32} />
                      <h4 className="text-white font-bold text-xl mb-2">{room.name}</h4>
                      <p className="text-gray-400 text-sm mb-1">Max Capacity: {room.capacity}</p>
                      <p className="text-yellow-400 font-bold text-lg">{room.price}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-gray-400 mt-8 text-sm bold">
                * Song library updated monthly. Call for availability.
              </p>
            </Card>
          </TabsContent>

          {/* Packages Weekend Tab */}
          <TabsContent value="packages">
            <Card className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-500/30 p-8">
              <h3 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                Private Room Packages
              </h3>
              <p className="text-gray-300 mb-8 text-center">
                Your room. Your night. Food and drinks included.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-black/40 border-yellow-500/30 p-6 text-center hover:border-yellow-400 transition-all
          h-full">
                    <Users className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h4 className="text-white font-bold text-xl mb-2">Brooklyn/Budweiser</h4>
                    <p className="text-gray-400 text-sm mb-4">11-15 guests</p>
                    <p className="text-yellow-400 font-bold text-2xl mb-4">$250</p>
                    <div className="text-gray-300 text-sm space-y-2 border-t border-yellow-500/20 pt-4">
                      <p>• 3 hours Karaoke</p>
                      <p>• 4 Appetizers</p>
                      <p>• 2 Entrees</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-black/40 border-yellow-500/30 p-6 text-center hover:border-yellow-400 transition-all
          h-full">
                    <Users className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h4 className="text-white font-bold text-xl mb-2">Factory</h4>
                    <p className="text-gray-400 text-sm mb-4">16-20 guests</p>
                    <p className="text-yellow-400 font-bold text-2xl mb-4">$300</p>
                    <div className="text-gray-300 text-sm space-y-2 border-t border-yellow-500/20 pt-4">
                      <p>• 3 Hours Karaoke</p>
                      <p>• 6 Appetizers</p>
                      <p>• 3 Entrees</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-black/40 border-yellow-500/30 p-6 text-center hover:border-yellow-400 transition-all
          h-full">
                    <Users className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h4 className="text-white font-bold text-xl mb-2">Lounge</h4>
                    <p className="text-gray-400 text-sm mb-4">&gt;21 guests</p>
                    <p className="text-yellow-400 font-bold text-2xl mb-4">$350</p>
                    <div className="text-gray-300 text-sm space-y-2 border-t border-yellow-500/20 pt-4">
                      <p>• 3 hours Karaoke</p>
                      <p>• 10 Appetizers</p>
                      <p>• 4 Entrees</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <p className="text-center text-gray-400 mt-8 text-sm">
                * 20% autogratuity and tax applies to all bills. Call for availability and booking.
              </p>
              <p className="text-center text-gray-400 mt-8 text-sm">
                * Promotion only valid on weekend (Friday & Saturday)
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
