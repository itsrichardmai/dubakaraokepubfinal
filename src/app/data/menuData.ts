export const menuData = {
  appetizers: [
    { name: 'Kimchi', korean: '김치', description: 'Traditional fermented cabbage' },
    { name: 'Japchae', korean: '잡채', description: 'Glass noodles with vegetables' },
    { name: 'Mandu', korean: '만두', description: 'Korean dumplings (steamed or fried)' },
    { name: 'Pajeon', korean: '파전', description: 'Korean scallion pancake' },
    { name: 'Tteokbokki', korean: '떡볶이', description: 'Spicy rice cakes' },
  ],
  bbqChicken: [
    { name: 'Soy Garlic Chicken', korean: '간장 마늘 치킨', description: 'Sweet and savory soy garlic flavor' },
    { name: 'Honey Garlic Chicken', korean: '허니 갈릭 치킨', description: 'Honey Garlic flavor ' },
    { name: 'Secret Spicy Chicken', korean: '비밀 매콤 치킨', description: 'Sweet and savory soy garlic flavor' },
    { name: 'Hot Spicy Chicken', korean: '매콤한 치킨', description: 'Mild and sweet chili' },
    
    
    
  ],
  bbq: [
    { name: 'Galbi (Short Ribs)', korean: '갈비', description: 'Marinated beef short ribs' },
    { name: 'Bulgogi', korean: '불고기', description: 'Marinated beef' },
    { name: 'Samgyeopsal', korean: '삼겹살', description: 'Pork belly' },
    { name: 'Spicy Pork', korean: '제육볶음', description: 'Marinated spicy pork' },
    { name: 'Combo Platter', korean: '모듬구이', description: 'Mix of beef, pork, and chicken' },
  ],
  soups: [
    { name: 'Odeng Tang', korean: '오뎅탕', description: 'Traditional fishcake soup' },
    { name: 'Seafood Ramen', korean: '해산물 라면', description: 'spicy seafood broth ramen served with shrimp and vegetables' },
  ],
  mains: [
    { name: 'Donkatsu', korean: '돈까스', description: 'Fried pork cutlet served with house special katsu sauce and salad' },
    { name: 'Yaki Udon', korean: '돌솥 비빔밥', description: 'spicy stir-fried udon with shrimp, mussels, and vegetables' },
    { name: 'Chopped Steak', korean: '다진 고기 스테이크', description: 'steak stir-fried with onion, peppeter, and house special steak sauce' },
    { name: 'Pork, Dubu, & Kimchi', korean: '돼지고기, 두부, 김치', description: 'marinated pork loin and kimchi stir-fried with dubu on the side' },
    { name: 'LA Galbi', korean: 'LA 갈비', description: 'marinated beef ribs with onions' },
    { name: 'Spicy Cheese Rice Cake', korean: '매콤한 치즈 떡', description: 'chewy rice cakes and fish cakes simmered in a fiery, sweet, and savory sauce blanketed with melted mozzarella' },
  ],
  desserts: [
    { name: 'Hodduk Vanilla Ice Cream', korean: '호덕 바닐라 아이스크림', description: 'sweet korean pancake served with vanilla ice cream with chocolate drizzle on top' },
  ],
  drinks: {
    byDraft: [
      { name: 'Coors Light', description: '4.2% Light Lager' },
      { name: 'Yuengling Lager', description: '4.2% Amber Lager' },
      { name: 'Sapporo Premium', description: '4.9% Lager' },
      { name: 'Heineken', description: '5.0% Pale Lager' },
      { name: 'Angry Orchard Crisp Apple', description: '5.0% Cider' },
      { name: 'Blue Moon', description: '5.4% Witbier' },
      { name: '2SP Up & Out', description: '6.0% Hazy IPA' },
      { name: 'Lagunitas IPA', description: '6.2% IPA' },
      { name: 'Guinness', description: '4.2% Stout' },
    ],
    byBottle: {
      domestic: [
        { name: 'Coors Light', description: '4.2% Light Lager' },
        { name: 'Miller Lite', description: '4.2% Light Lager' },
        { name: 'Budweiser', description: '' },
        { name: 'Stella Artois', description: '5.0% Lager' },
        { name: 'White Claw', description: '5.0% Seltzer' },
        { name: "Truly's", description: '5.0% Seltzer' },
        { name: 'Dogfish Head 90 min', description: '9.0% Imperial IPA' },
      ],
      imports: [
        { name: 'Corona Extra', description: '4.6% Adjunct Lager' },
        { name: 'Heineken', description: '5.0% Pale Lager' },
        { name: 'Kirin Ichiban', description: '5.0% Pale Lager' },
        { name: 'Tsingtao', description: '4.8% Lager' },
        { name: 'Hoegaarden', description: '4.9% Witbier' },
        { name: 'Singha', description: '5.0% Pale Larger' }
      ],
    },
    cocktails: {
      adultCaprisun: [
        { name: 'Strawberry Smash Caprisun', description: 'Soju, Muddled Strawberry, Yuzu Syrup' },
        { name: 'Lemonade Caprisun', description: 'Soju, Squeezed Lemon, Simple Syrup' },
        { name: 'Mango Caprisun', description: 'Soju, Mango Syrup, Orange Juice' },
        { name: 'Soju Punch Caprisun', description: 'Soju, Pineapple Juice, Orange Juice, Cranberry Juice, Lime Juice, Grenadine' },
        { name: 'Peach Caprisun', description: 'Soju, Peach Schnapps, Peach Syrup, Peach Nectar, Lime Juice' },
      ],
      classicCocktails: [
        { name: 'Bay Breeze', description: 'Vodka, Pineapple Juice, Cranberry Juice' },
        { name: 'Long Island', description: 'Vodka, Rum, Gin, Tequila, Triple Sec, Sweet & Sour Mix, Coke' },
        { name: 'Tokyo Tea', description: 'Vodka, Rum, Gin, Tequila, Tripel Sec, Midori, Sweet & Sour Mix, Sprite' },
        { name: 'Tequila Sunrise', description: 'Tequila, Orange Juice, Cranberry Juice, Grenadine' },
        { name: 'Yuzu Mule', description: 'Vodka, Yuzu, Lime, Ginger Beer' },
        { name: 'Peach-Pomtini', description: 'Pomegranate Vodka, Peach Schnapps, Lemon, Grenadine' },
        { name: 'Cosmopolitan', description: 'Vodka, Lime Juice, Triple Sec, Cranberry Juice' },
        { name: 'Espresso Martini', description: 'Vodka, Espresso, Kaluha' }
      ],
      shooters: [
        { name: 'Green Tea', description: '(1) or (Pitcher)' },
        { name: 'Lemon Drop', description: '' },
        { name: 'Irish Car Bomb', description: '' },
        { name: 'Jager Bomb', description: '' },
      ],
    },
    koreanTraditional: [
      { name: 'Charm Soju', korean: '참 소주', description: '19.3% - High ABV, Sweeter Clean Finish - 375ml' },
      { name: 'Chamisul Green Grape', korean: '참이슬 청포도', description: '13.0% - Green Grape flavored Soju - 375ml' },
      { name: 'Makgeolli', korean: '막걸리', description: '6.0% - Unfiltered Rice Wine - 1 Liter' },
      { name: 'Bok Bun Ja', korean: '복분자', description: '15.0% - Korean Raspberry Wine - 375ml' },
      { name: 'Soonhari Strawberry', korean: '딸기', description: '13.0% - Korean Strawberry - 375ml' },
      { name: 'Soonhari Yogurt', korean: '요구르트', description: '13.0% - Korean Yogurt - 375ml' },
      { name: 'Soonhari Apple', korean: '사과', description: '13.0% - Korean Apple - 375ml' },
      { name: 'Soonhari Peach', korean: '복숭아', description: '13.0% - Korean Peach - 375ml' },
    ],
    whiskey: {
      japanese: [
        { name: 'Suntory Toki Blended', description: '' },
        { name: 'Nikka Taketsuru Pure Malt', description: '' },
        { name: 'Suntory Hibiki Harmony', description: '' },
        { name: 'Blende 86 Proof', description: '' },
      ],
      american: [
        { name: 'Mellow Corn Kentucky Straight Corn 100 Proof', description: '' },
        { name: "Jack Daniel's Old Number 7", description: '' },
      ],
      irish: [
        { name: 'Jameson', description: '' },
      ],
      bourbon: [
        { name: 'Evan Williams Bottled in Bond 100 Proof', description: '' },
        { name: "Maker's Mark", description: '' },
        { name: 'Bulleit', description: '' },
      ],
      scotch: {
        singleMalt: [
          { name: 'Glenlivet 12 years', description: '' },
          { name: 'Macallan 12 years', description: '' },
          { name: 'Oban Scotch 14 years', description: '' },
          { name: 'Glenfiddich Scotch 18 year', description: '' },
          { name: 'Glenlivet 18 years', description: '' },
          { name: 'Macallan 18 years', description: '' },
        ],
        blended: [
          { name: 'Johnnie Walker Black 12 year', description: '' },
          { name: 'Johnnie Walker Blue', description: '' },
        ],
      },
      rye: [
        { name: 'Old Overholt Rye Whiskey', description: '' },
        { name: 'Bulleit Rye', description: '' },
      ],
      canadian: [
        { name: "Seagram's 7 Crown Blended Whiskey", description: '' },
        { name: 'Crown Royal Canadian Whisky', description: '' },
      ],
    },
    wine: {
      red: [
        { name: 'Cabernet Sauvignon', description: "Beringer Founder's Estate, California" },
        { name: 'Malbec', description: 'Alamos, Mendoza, Argentina' },
        { name: 'Merlot', description: '' },
        { name: 'Pinot Noir', description: '' }
        
      ],
      white: [
        { name: 'Moscato', description: '' },
        { name: 'Sauvignon Blanc', description: 'Brancott Estate, New Zealand' },
        { name: 'Chardonnay', description: 'Alamos, Mendoza, Argentina' },
        { name: 'Pinot Grigo', description: 'Alamos, Mendoza, Argentina' },
      ],
      rose: [
        { name: 'Rose', description: 'Sepal Estates, California 2016' },
      ],
      bubble: [
        { name: 'Champagnes', description: 'Korbel Brut, California' },
      ],
    },
  },
};

export const happyHour = {
  timing: 'Sunday - Thursday 5PM - 10PM | Friday - Saturday | 5PM - 9PM' ,
  note: 'Except Holidays',
  specials: [
    { name: 'Capri Pouches', price: '$8' },
    { name: 'Shooter Pitcher', price: '$20' },
    { name: 'Dumplings', price: '$6' },
    { name: 'Honey Butter Chips', price: '$6' },
    { name: 'Fries', price: '$6' },
    { name: 'Yoo Lin Gi', price: '$10' },
    { name: 'Hawaiian Spam', price: '$8' },
    { name: 'Korean Ribs', price: '$15' },
    { name: 'Korean Wings', price: '$20' },
  ],
  karaokeDiscount: 'Discounted Karaoke (Sunday - Thursday)',
};

export const karaokeRooms = [
  { name: 'Heineken', capacity: '9', price: '$60/hr' },
  { name: 'Brooklyn', capacity: '12', price: '$80/hr' },
  { name: 'Corona', capacity: '6', price: '$40/hr' },
  { name: 'Budweiser', capacity: '12', price: '$80/hr' },
  { name: 'Factory', capacity: '18', price: '$100/hr' },
  { name: 'Coors', capacity: '6', price: '$40/hr' },
  { name: 'Guinness', capacity: '6', price: '$40/hr' },
  { name: 'Stella', capacity: '6', price: '$40/hr' },
  { name: 'Lounge', capacity: '30', price: '$125/hr' },
];
