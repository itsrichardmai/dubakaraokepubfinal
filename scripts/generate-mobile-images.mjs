// scripts/generate-mobile-images.mjs
import sharp from 'sharp';

const images = [
  'public/friday-night-public-karaoke-promo.webp',
  'public/bbq-chicken-promo.webp',
  'public/korean-food-collage.webp',
];

for (const img of images) {
  const mobilePath = img.replace('.webp', '-mobile.webp');
  await sharp(img)
    .resize(600, null)
    .webp({ quality: 75 })
    .toFile(mobilePath);
  console.log(`Created: ${mobilePath}`);
}
