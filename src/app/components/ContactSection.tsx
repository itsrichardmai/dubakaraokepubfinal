import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { karaokeRooms } from '../data/menuData';

const contactInfo = {
  phone: '215-635-DUBA (3822)',
  email: 'duba.elkins@gmail.com',
  address: '1333 W. Cheltenham Ave, Fl Basement, Elkins Park, PA 19027',
  hours: {
    'Thursday - Saturday': '5:00 PM - 2:00 AM',
    'Sunday - Wednesday': '5:00 PM - 1:00 AM',
  },
};

const promoPackages = [
  'Brooklyn/Budweiser: ($250+) = Appetizer(4) + Entree(2)',
  'Factory: ($300+) = Appetizer(6) + Entree(3)',
  'Lounge: ($350+) = Appetizer(10) + Entree(4)',
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeIn: '',
    timeOut: '',
    promoPackage: '',
    desiredRoom: '',
    specialRequests: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    const match = phone.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const formatDate = (value: string) => {
    const date = value.replace(/\D/g, '');
    const match = date.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.date || 
        !formData.timeIn || !formData.timeOut || !formData.desiredRoom) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast.success('Reservation request sent! We\'ll contact you soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        timeIn: '',
        timeOut: '',
        promoPackage: '',
        desiredRoom: '',
        specialRequests: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact-us" className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 p-8">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                      <Phone className="text-yellow-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone</h4>
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                      <Mail className="text-yellow-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="text-gray-300 hover:text-yellow-400 transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                      <MapPin className="text-yellow-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Address</h4>
                      <p className="text-gray-300">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                      <Clock className="text-yellow-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Hours</h4>
                      {Object.entries(contactInfo.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-4 text-sm mb-1">
                          <span className="text-gray-400">{day}:</span>
                          <span className="text-gray-300">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Delivery Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-yellow-400/10 to-transparent border-yellow-500/30 p-8">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Order Delivery</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.grubhub.com/restaurant/duba-karaoke--pub-1333-west-cheltenham-avenue-elkins-park/5822655"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-black/50 hover:bg-orange-600/20 border border-orange-600/30 hover:border-orange-600 p-4 rounded-lg transition-all group"
                  >
                    <span className="text-orange-400 font-semibold text-lg">Grubhub</span>
                    <span className="text-white group-hover:text-orange-400 font-medium text-sm">Order Now →</span>
                  </a>

                  <a
                    href="https://www.ubereats.com/store/duba-karaoke-and-pub-philadelphia/vYL5bAjqRZaV_FH6uLBs0Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-black/50 hover:bg-green-600/20 border border-green-600/30 hover:border-green-600 p-4 rounded-lg transition-all group"
                  >
                    <span className="text-green-400 font-semibold text-lg">Uber Eats</span>
                    <span className="text-white group-hover:text-green-400 font-medium text-sm">Order Now →</span>
                  </a>

                  <a
                    href="https://www.doordash.com/store/duba-karaoke-&-pub-elkins-park-1568208/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-black/50 hover:bg-red-600/20 border border-red-600/30 hover:border-red-600 p-4 rounded-lg transition-all group"
                  >
                    <span className="text-red-400 font-semibold text-lg">DoorDash</span>
                    <span className="text-white group-hover:text-red-400 font-medium text-sm">Order Now →</span>
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Make a Reservation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
                    className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                    placeholder="215-555-1234"
                    maxLength={12}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-gray-300">Date *</Label>
                  <Input
                    id="date"
                    type="text"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', formatDate(e.target.value))}
                    className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                    placeholder="MM-DD-YYYY"
                    maxLength={10}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeIn" className="text-gray-300">Time In *</Label>
                    <Input
                      id="timeIn"
                      type="time"
                      value={formData.timeIn}
                      onChange={(e) => handleInputChange('timeIn', e.target.value)}
                      className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeOut" className="text-gray-300">Time Out *</Label>
                    <Input
                      id="timeOut"
                      type="time"
                      value={formData.timeOut}
                      onChange={(e) => handleInputChange('timeOut', e.target.value)}
                      className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="promoPackage" className="text-gray-300">Karaoke Room Promos</Label>
                  <Select value={formData.promoPackage} onValueChange={(value) => handleInputChange('promoPackage', value)}>
                    <SelectTrigger className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1">
                      <SelectValue placeholder="Select a promo package (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {promoPackages.map((pkg) => (
                        <SelectItem key={pkg} value={pkg} className="text-white focus:bg-yellow-400/20">
                          {pkg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="desiredRoom" className="text-gray-300">Desired Room *</Label>
                  <Select value={formData.desiredRoom} onValueChange={(value) => handleInputChange('desiredRoom', value)}>
                    <SelectTrigger className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {karaokeRooms.map((room) => (
                        <SelectItem 
                          key={room.name} 
                          value={`${room.name} (Max ${room.capacity}) - ${room.price}`}
                          className="text-white focus:bg-yellow-400/20"
                        >
                          {room.name} (Max {room.capacity}) - {room.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="text-gray-300">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white focus:border-yellow-400 mt-1 resize-none"
                    placeholder="Any special requests or dietary restrictions?"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold py-6 text-lg"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Submit Reservation
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </Button>

                <p className="text-gray-400 text-xs text-center">
                  * A deposit will be required for large groups or private room bookings. We'll contact you to confirm your reservation. 
                </p>
                <p className="text-gray-400 text-xs text-center">
                  * No outside food or drinks allowed. A gratuity of 20% will be added to Karaoke room bookings. Everyone must be 21+ to enter on Fridays/Saturdays
                </p>
                <p className="text-gray-400 text-xs text-center">
                  * Submitting reservation confirms your compliance to our policies. 
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
