import { motion } from 'motion/react';
import { Beer, ChefHat, Wine, Flame } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { menuData, happyHour } from '../data/menuData';

export function MenuSection() {
  return (
    <section id="menu" className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent" style={{ fontFamily: "'Yeseva One', serif" }}>
            OUR MENU
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
        </motion.div>

        <Tabs defaultValue="food" className="max-w-7xl mx-auto">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide mb-8 bg-gray-900/50 border border-yellow-500/20">
            <TabsTrigger value="food" className="text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <ChefHat className="mr-2 h-4 w-4" />
              Food
            </TabsTrigger>
            <TabsTrigger value="drinks" className="flex-shrink-0 whitespace-nowrap text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Wine className="mr-2 h-4 w-4" />
              Drinks
            </TabsTrigger>
            <TabsTrigger value="happyhour" className="flex-shrink-0 whitespace-nowrap text-gray-300 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Beer className="mr-2 h-4 w-4" />
              Happy Hour
            </TabsTrigger>
          </TabsList>

          {/* Food Tab */}
          <TabsContent value="food" className="space-y-8">
            {/* BB.Q Chicken - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-red-900/30 to-black border-2 border-red-500/30 p-8">
                <div className="text-center mb-6">
                  <p className="text-yellow-400 text-sm font-semibold mb-2">⭐ NOW FEATURING ⭐</p>
                  <h3 className="text-4xl font-bold text-red-500 mb-2 flex items-center justify-center gap-3">
                    <Flame className="text-red-400" />
                    bb.q CHICKEN
                    <Flame className="text-red-400" />
                  </h3>
                  <p className="text-gray-300 text-sm">No.1 Korean Chicken | Famous in 57 Countries </p>
                  <p className="text-gray-300 text-sm">Boneless | Wings | Drumsticks </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {menuData.bbqChicken.map((item, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-4 hover:bg-black/70 transition-colors">
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {item.name}
                      </h4>
                      {item.korean && (
                        <p className="text-yellow-400 text-sm mb-2">{item.korean}</p>
                      )}
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Other Food Categories */}
            <div className="grid md:grid-cols-2 gap-8">
              <MenuCategory title="Appetizers (전채)" items={menuData.appetizers} />
              <MenuCategory title="Small Plates (작은 접시)" items={menuData.smallplates} />
              <MenuCategory title="Soups & Stews (찌개)" items={menuData.soups} />
              <MenuCategory title="Chef Special (셰프 특선 요리)" items={menuData.mains} />
              <MenuCategory title="Desserts (셰프 특선 요리)" items={menuData.desserts} />

            </div>
          </TabsContent>

          {/* Happy Hour Tab */}
          <TabsContent value="happyhour">
            <HappyHourCard />
          </TabsContent>

          {/* Drinks Tab */}
          <TabsContent value="drinks">
            <div className="space-y-6">
              <Accordion type="single" collapsible className="space-y-4">
                <DrinkAccordion title="By Draft" items={menuData.drinks.byDraft} />
                
                <AccordionItem value="byBottle" className="border border-yellow-500/20 rounded-lg px-6 bg-gray-900/30">
                  <AccordionTrigger className="text-xl font-semibold text-white hover:text-yellow-400">
                    By Bottle
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <div>
                      <h4 className="text-yellow-400 font-semibold text-lg mb-3">Domestic</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {menuData.drinks.byBottle.domestic.map((item, i) => (
                          <DrinkItem key={i} {...item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold text-lg mb-3">Imports</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {menuData.drinks.byBottle.imports.map((item, i) => (
                          <DrinkItem key={i} {...item} />
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <CocktailAccordion />
                <DrinkAccordion title="Korean Traditional Drinks" items={menuData.drinks.koreanTraditional} showKorean />
                <WhiskeyAccordion />
                <WineAccordion />
              </Accordion>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
}

// Helper Components
function MenuCategory({ title, items }: { title: string; items: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 p-6 h-full">
        <h3 className="text-2xl font-semibold mb-4 text-yellow-400 border-b border-yellow-500/30 pb-3">
          {title}
        </h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <h4 className="text-white font-medium">
                {item.name}
                {item.korean && <span className="text-yellow-400 ml-2">({item.korean})</span>}
              </h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function HappyHourCard() {
  const happyHourDrinks = happyHour.specials.filter(item =>
    ['Adult Capri Sun', 'Shooter Pitcher', 'Espresso Martini', 'Beer Pitcher', 'Green Tea Pitcher', 'Long Island', 'Soju'].includes(item.name)
  );
  const happyHourFood = happyHour.specials.filter(item =>
    !['Adult Capri Sun', 'Shooter Pitcher', 'Espresso Martini', 'Beer Pitcher', 'Green Tea Pitcher', 'Long Island', 'Soju'].includes(item.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gradient-to-br from-yellow-400/20 via-red-500/10 to-black border-2 border-yellow-500/40 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-xl mb-3">
            <Beer size={24} />
            <span>HAPPY HOUR SPECIALS</span>
            <Beer size={24} />
          </div>
          <p className="text-yellow-400 text-lg font-semibold mb-1">{happyHour.timing}</p>
          <p className="text-gray-400 text-sm">({happyHour.note})</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Drinks Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-yellow-500/30">
              <Wine className="text-yellow-400" size={20} />
              <h4 className="text-yellow-400 font-semibold text-lg">Drinks</h4>
            </div>
            <div className="space-y-3">
              {happyHourDrinks.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-black/30 rounded-lg px-4 py-2">
                  <span className="text-white">{item.name}</span>
                  <span className="text-yellow-400 font-bold text-lg">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Food Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-yellow-500/30">
              <ChefHat className="text-yellow-400" size={20} />
              <h4 className="text-yellow-400 font-semibold text-lg">Food</h4>
            </div>
            <div className="space-y-3">
              {happyHourFood.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-black/30 rounded-lg px-4 py-2">
                  <span className="text-white">{item.name}</span>
                  <span className="text-yellow-400 font-bold text-lg">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Card>
    </motion.div>
  );
}

function DrinkAccordion({ title, items, showKorean = false }: { title: string; items: any[]; showKorean?: boolean }) {
  return (
    <AccordionItem value={title} className="border border-yellow-500/20 rounded-lg px-6 bg-gray-900/30">
      <AccordionTrigger className="text-xl font-semibold text-white hover:text-yellow-400">
        {title}
      </AccordionTrigger>
      <AccordionContent className="grid md:grid-cols-2 gap-3 pt-4">
        {items.map((item, i) => (
          <DrinkItem key={i} {...item} showKorean={showKorean} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function DrinkItem({ name, description, korean, showKorean }: any) {
  return (
    <div className="bg-black/30 rounded-lg p-3">
      <p className="text-white font-medium">
        {name}
        {showKorean && korean && <span className="text-yellow-400 ml-2">({korean})</span>}
      </p>
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
  );
}

function CocktailAccordion() {
  return (
    <AccordionItem value="cocktails" className="border border-yellow-500/20 rounded-lg px-6 bg-gray-900/30">
      <AccordionTrigger className="text-xl font-semibold text-white hover:text-yellow-400">
        Cocktails
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <div>
          <h4 className="text-yellow-400 font-semibold text-lg mb-3">Adult Caprisun</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {menuData.drinks.cocktails.adultCaprisun.map((item, i) => (
              <DrinkItem key={i} {...item} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-yellow-400 font-semibold text-lg mb-3">Classic Cocktails</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {menuData.drinks.cocktails.classicCocktails.map((item, i) => (
              <DrinkItem key={i} {...item} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-yellow-400 font-semibold text-lg mb-3">Shooters</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {menuData.drinks.cocktails.shooters.map((item, i) => (
              <DrinkItem key={i} {...item} />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function WhiskeyAccordion() {
  const { whiskey } = menuData.drinks;
  return (
    <AccordionItem value="whiskey" className="border border-yellow-500/20 rounded-lg px-6 bg-gray-900/30">
      <AccordionTrigger className="text-xl font-semibold text-white hover:text-yellow-400">
        Liquor
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <WhiskeyCategory title="Vodka" items={whiskey.japanese} />
        <WhiskeyCategory title="Tequila" items={whiskey.american} />
        <WhiskeyCategory title="Rum" items={whiskey.irish} />
        <WhiskeyCategory title="Gin" items={whiskey.bourbon} />
        <WhiskeyCategory title="Whiskey" items={whiskey.scotch.singleMalt} />
        <WhiskeyCategory title="Scotch - Blended" items={whiskey.scotch.blended} />
        <WhiskeyCategory title="Liquors" items={whiskey.rye} />
      </AccordionContent>
    </AccordionItem>
  );
}

function WhiskeyCategory({ title, items }: { title: string; items: any[] }) {
  return (
    <div>
      <h4 className="text-yellow-400 font-semibold text-lg mb-3">{title}</h4>
      <div className="grid md:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <p key={i} className="text-white bg-black/30 rounded px-3 py-2">{item.name}</p>
        ))}
      </div>
    </div>
  );
}

function WineAccordion() {
  const { wine } = menuData.drinks;
  return (
    <AccordionItem value="wine" className="border border-yellow-500/20 rounded-lg px-6 bg-gray-900/30">
      <AccordionTrigger className="text-xl font-semibold text-white hover:text-yellow-400">
        Wine
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <WhiskeyCategory title="Red" items={wine.red} />
        <WhiskeyCategory title="White" items={wine.white} />
        <WhiskeyCategory title="Rose" items={wine.rose} />
        <WhiskeyCategory title="Bubble" items={wine.bubble} />
      </AccordionContent>
    </AccordionItem>
  );
}

        // <Card className="bg-gradient-to-r from-red-500/20 to-yellow-400/20 border border-yellow-500/50 p-6 text-center">
        //   <div className="flex items-center justify-center gap-3">
        //     <Mic2 size={28} className="text-yellow-400" />
        //     <p className="text-yellow-400 text-2xl font-bold">{happyHour.karaokeDiscount}</p>
        //     <Mic2 size={28} className="text-yellow-400" />
        //   </div>
        //   <p className="text-gray-300 text-sm mt-2"></p>
        // </Card>