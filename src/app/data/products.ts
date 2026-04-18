export interface Product {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
  badge?: string;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
}

// Helper function to create image path
const img = (path: string) => `/images/${path}`;

export const categories = [
  { id: 'all', name: 'all', nameEn: 'All' },
  { id: 'Clothes', name: 'Clothes', nameEn: 'Clothes' },
  { id: 'Bags', name: 'Bags', nameEn: 'Bags' },
  { id: 'Shoes', name: 'Shoes', nameEn: 'Shoes' },
  { id: 'Accessories', name: 'Accessories', nameEn: 'Accessories' },
  { id: 'Packaging', name: 'Packaging', nameEn: 'Packaging' },
];

// Category with image mappings for display
export const categoryImages: Record<string, string> = {
  'Clothes': '/images/HIGHLITS/Denim/Blue Peack Denim Short Dress.jpg',
  'Bags': '/images/HIGHLITS/BAGS/PEACOCK CANVAS BLACK SHOP.jpg',
  'Shoes': '/images/HIGHLITS/Shoes/SMOOTH LEATHER MS KISS PUMP.jpg',
  'Accessories': '/images/HIGHLITS/Accessories/BLUE CRYSTALS.jpg',
  'Packaging': '/images/packiging/1.jpeg',
};

export const products: Product[] = [
  // ------------------Shoes Category------------------
  {
    id: 1,
    name: 'High Skully Heels',
    arabicName: 'كعب عالي جمجمة',
    description: 'High heels with prominent skull details and a dark shine; suitable for parties and bold looks.',
    price: 8900,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/SMOOTH LEATHER MS KISS PUMP.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Best Seller',
    tags: ['heels', 'skull', 'leather', 'black'],
    colors: ['Black', 'Silver'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 2,
    name: 'Dark Skully Halfboot',
    arabicName: 'نصف بوت جمجمة داكن',
    description: 'Black half-boot with metallic skull engraving and leather touches; sturdy and suitable for daily use.',
    price: 10900,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/SMOOTH LEATHER MS KISS ANKLE BOOTS.jpg'),
    rating: 4.7,
    inStock: true,
    badge: 'New',
    tags: ['boots', 'skull', 'leather', 'black'],
    colors: ['Black', 'Brown'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 3,
    name: 'Mesh Kitten Heel Mules',
    arabicName: 'كعب شبكي منخفض',
    description: 'Elegant mesh mules with kitten heel; perfect blend of comfort and style with a delicate touch.',
    price: 9900,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/MESH FLOCK KITTEN HEEL MULES.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'Featured',
    tags: ['mules', 'mesh', 'heels', 'elegant'],
    colors: ['Black', 'Burgundy', 'Silver'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 4,
    name: 'Peacock Canvas Ballerina',
    arabicName: 'باليرينا طاووس',
    description: 'Comfortable ballerina flats with peacock printed canvas; lightweight and perfect for everyday wear.',
    price: 7400,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/PEACOCK PRINTED CANVAS BALLERINA FLATS.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['flats', 'canvas', 'peacock', 'comfortable'],
    colors: ['Blue', 'Black', 'White'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 5,
    name: 'Embossed Denim Mules',
    arabicName: 'مولز دينم بارز',
    description: 'Stylish mules with embossed denim texture; unique design that combines casual and elegant elements.',
    price: 11200,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/EMBOSSED DENIM MS MULES.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Premium',
    tags: ['mules', 'denim', 'embossed', 'stylish'],
    colors: ['Blue', 'Black'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 6,
    name: 'Smooth Leather MS Kiss Pump',
    arabicName: 'حذاء MS كيس جلدي ناعم',
    description: 'Introduction of the new MS Kiss range: bold, elegant women\'s city shoes made in Italy from LWG-certified leather. Distinctive design features include sharp pointed toes and a subtly curved heel, making each model a statement piece. Sophisticated heels available in black or white nappa leather, and a striking metallic silver version.',
    price: 400,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/SMOOTH LEATHER MS KISS PUMP.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Featured',
    tags: ['pump', 'leather', 'kiss', 'italy', 'lwg-certified'],
    colors: ['Black', 'White', 'Silver'],
    sizes: ['36', '37', '38', '39', '40']
  },
  {
    id: 6.5,
    name: 'Smooth Leather MS Pump',
    arabicName: 'حذاء MS جلدي ناعم',
    description: 'Smooth leather exterior with rhinestoned peacock rivet. Features 6 cm heel for elegant elevation.',
    price: 500,
    category: 'Shoes',
    image: img('HIGHLITS/Shoes/SMOOTH LEATHER MS PUMP.jpg'),
    rating: 4.8,
    inStock: true,
    tags: ['pump', 'leather', 'rhinestone', 'peacock', 'heel'],
    colors: ['Black', 'Gold'],
    sizes: ['36', '37', '38', '39', '40']
  },

  // ------------------Bags------------------
  {
    id: 7,
    name: 'Peacock Canvas Black Shop',
    arabicName: 'حقيبة تسوق سوداء',
    description: 'Spacious shopping bag with peacock canvas print; perfect for daily essentials with bold style.',
    price: 5200,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK CANVAS BLACK SHOP.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'Best Seller',
    tags: ['bag', 'canvas', 'peacock', 'shopping'],
    colors: ['Black', 'Brown', 'Navy'],
    sizes: ['One Size']
  },
  {
    id: 8,
    name: 'Peacock Canvas Core',
    arabicName: 'حقيبة قماشية',
    description: 'Compact core bag with zippered closure and signature peacock jacquard lining. ZAFIRA leather patch. Dimensions: 26 X 12.5 x 5 cm, Handle Height: 22cm.',
    price: 490,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK CANVAS CORE.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['bag', 'canvas', 'compact', 'core', 'zippered'],
    colors: ['Black', 'Brown', 'Navy'],
    sizes: ['One Size']
  },
  {
    id: 9,
    name: 'Peacock Embossed Jeans Futura',
    arabicName: 'حقيبة دينم بارزة',
    description: 'Trendy bag with peacock embossed jeans texture; unique design for fashion-forward looks.',
    price: 6100,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK EMBOSSED JEANS FUTURA.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'New',
    tags: ['bag', 'denim', 'embossed', 'trendy'],
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['One Size']
  },
  {
    id: 10,
    name: 'Peacock White Leather Futura',
    arabicName: 'حقيبة جلد بيضاء',
    description: 'Elegant white leather bag with peacock embossed details; sophisticated choice for refined occasions.',
    price: 7900,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK EMBOSSED WHITE LEATHER FUTURA.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Featured',
    tags: ['bag', 'leather', 'white', 'elegant'],
    colors: ['White', 'Cream'],
    sizes: ['One Size']
  },
  {
    id: 11,
    name: 'Peacock Gold in Black Canvas Eclips Mini',
    arabicName: 'حقيبة ميني سوداء طاووس ذهبي',
    description: 'Peacock gold printed canvas exterior with zipper closure and peacock engraved puller. Adjustable top handle with Signature Peacock buckle. Interior in Peacock jacquard lining with inside pocket and foiled logo patch. Dimensions: 23 x 18 x 7 cm, Adjustable handle: 14 to 25 cm drop length.',
    price: 400,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK GOLD IN BLACK CANVAS ECLIPS MINI.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['bag', 'mini', 'canvas', 'gold', 'eclips'],
    colors: ['Black', 'Pink', 'Navy'],
    sizes: ['One Size']
  },
  {
    id: 12,
    name: 'Pink Leather Monogram Futura',
    arabicName: 'حقيبة جلد وردي',
    description: 'Stylish pink leather bag with peacock monogram embossing; feminine and modern design.',
    price: 8600,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK MONOGRAM EMBOSSED PINK LEATHER FUTURA.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Premium',
    tags: ['bag', 'leather', 'pink', 'monogram'],
    colors: ['Pink', 'Rose Gold'],
    sizes: ['One Size']
  },
  {
    id: 13,
    name: 'Leather Card Holder',
    arabicName: 'حامل بطاقات جلدي',
    description: 'Sleek leather card holder with peacock screenprint; compact accessory for essentials.',
    price: 5600,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK SCREENPRINT LEATHER CARD HOLDER.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'New',
    tags: ['card holder', 'leather', 'compact', 'accessory'],
    colors: ['Black', 'Brown'],
    sizes: ['One Size']
  },

  // --------------Accessories Category -----------
  {
    id: 14,
    name: 'Blue Crystal Ring',
    arabicName: 'خاتم كريستال أزرق',
    description: 'Elegant ring featuring blue crystals with gold plating; adds sparkle to any outfit.',
    price: 2450,
    category: 'Accessories',
    image: img('HIGHLITS/Accessories/BLUE CRYSTALS.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Best Seller',
    tags: ['ring', 'crystal', 'blue', 'gold'],
    colors: ['Blue', 'Silver', 'Gold'],
    sizes: ['6', '7', '8', '9', '10']
  },
  {
    id: 15,
    name: 'Gold Plated Signet Ring',
    arabicName: 'خاتم ختم مطلي ذهب',
    description: 'Classic signet ring with enamel gold plating and button design; timeless accessory for refined style.',
    price: 2190,
    category: 'Accessories',
    image: img('HIGHLITS/Accessories/ENAMEL GOLD PLATED BUTTON SIGNET RING.jpg'),
    rating: 4.7,
    inStock: true,
    badge: 'Featured',
     tags: ['ring', 'crystal', 'blue', 'gold'],
    colors: ['Gold', 'Rose Gold'],
    sizes: ['6', '7', '8', '9', '10']
  },
  {
    id: 16,
    name: 'Gold Plated Peacock Studs',
    arabicName: 'حلق طاووس مطلي ذهب',
    description: 'Elegant peacock-inspired stud earrings with gold plating; lightweight and perfect for daily wear.',
    price: 1890,
    category: 'Accessories',
    image: img('HIGHLITS/Accessories/GOLD PLATED PEACOCK STUDS.jpg'),
    rating: 4.6,
    inStock: true,
    tags: ['earrings', 'gold', 'peacock', 'studs'],
    colors: ['Gold', 'Silver'],
    sizes: ['One Size']
  },
  {
    id: 15.5,
    name: 'Enamel Gold Plated Button Signet Ring',
    arabicName: 'خاتم ختم مطلي ذهب بالمينا',
    description: 'Black enamel around signature peacock shape with logo engraved inside ring.',
    price: 250,
    category: 'Accessories',
    image: img('HIGHLITS/Accessories/ENAMEL GOLD PLATED BUTTON SIGNET RING.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Featured',
    tags: ['ring', 'gold', 'enamel', 'peacock', 'signet'],
    colors: ['Gold', 'Black'],
    sizes: ['6', '7', '8', '9', '10']
  },

  // ------------Clothes Category (Dresses from Denim & MESH) ------
  {
    id: 18,
    name: 'Blue Peacock Denim Short Dress',
    arabicName: 'فستان دينم قصير أزرق',
    description: 'Stylish short dress in blue peacock denim; casual yet elegant for day and night wear.',
    price: 12500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Blue Peack Denim Short Dress.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'New',
    tags: ['dress', 'denim', 'blue', 'casual'],
    colors: ['Blue', 'Light Blue', 'Dark Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 19,
    name: 'Denim Patchwork Set Top & Pants',
    arabicName: 'طقم دينم بنطلون وتوب',
    description: 'Unique patchwork denim set with top and pants; peacock print adds artistic flair.',
    price: 18500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Denim patchwork Set Top and Pants with Peaco Printer.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Featured',
    tags: ['set', 'denim', 'patchwork', 'pants'],
    colors: ['Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 20,
    name: 'Denim Patchwork Top & Skirt',
    arabicName: 'طقم دينم جيبة وتوب',
    description: 'Artistic patchwork denim set with top and skirt; peacock print for bold fashion statements.',
    price: 17500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Denim patchwork Set Top and Skirt with Peacok Printer.jpg'),
    rating: 4.8,
    inStock: true,
    tags: ['set', 'denim', 'skirt', 'patchwork'],
    colors: ['Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 21,
    name: 'Leather Blouson with Floral Patches',
    arabicName: 'جاكيت جلد بباتش زهور',
    description: 'Premium leather blouson jacket with floral patch details; edgy meets elegant.',
    price: 21500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/LEATHER BLOUSON WITH FLORAL PATCHES.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Premium',
    tags: ['jacket', 'leather', 'floral', 'luxury'],
    colors: ['Black', 'Brown'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 22,
    name: 'Leather Dress with Gold Peacock',
    arabicName: 'فستان جلد بطاووس ذهبي',
    description: 'Stunning leather dress with gold peacock details; perfect for evening events.',
    price: 24500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/LEATHER DRESS WITH GOLD PEACOCK DETAILS.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Best Seller',
    tags: ['dress', 'leather', 'gold', 'peacock'],
    colors: ['Black', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 23,
    name: 'Long Dress Denim Iron Chains',
    arabicName: 'فستان دينم طويل بسلاسل',
    description: 'Dramatic long denim dress with iron chain details; bold statement piece.',
    price: 19500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Long Dress Denim Iron Chains.jpg'),
    rating: 4.8,
    inStock: true,
    tags: ['dress', 'denim', 'long', 'chains'],
    colors: ['Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 24,
    name: 'Peacock Monogram Embossed Leather Tailored Coat',
    arabicName: 'معطف جلدي مخصر مطبوع مونوجرام طاووس',
    description: 'Signature Moonogram embossed leather collar and inner sleeves. Single button front closure with metallic signature peacock button. Two welted flap pockets in front. Signature peacock jacquard lining with branded leather patch under neck in back.',
    price: 470,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/PEACOCK MONOGRAM EMBOSSED LEATHER TAILORED COAT.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Premium',
    tags: ['coat', 'leather', 'monogram', 'tailored', 'embossed'],
    colors: ['Black', 'Brown'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 27.5,
    name: 'Vintage Peacock Leather Biker Jacket',
    arabicName: 'جاكيت بايكر جلدي طاووس كلاسيكي',
    description: 'Zipper with signature peacock puller, two welt pockets and inside pockets. Oversized shoulders with shoulder pads, invisible hem on cuffs, topstitched hem on bottom. Belt with buckle, signature peacock jacquard lining and peacock leather patch.',
    price: 450,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/VINTAGE PEACOCK LEATHER BIKER JACKET.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Best Seller',
    tags: ['jacket', 'leather', 'biker', 'vintage', 'peacock'],
    colors: ['Black', 'Brown'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 25,
    name: 'Peacock Print Denim Short Dress',
    arabicName: 'فستان دينم قصير بطاووس',
    description: 'Chic short dress with peacock print on denim; playful yet stylish design.',
    price: 13500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Peacock Print Leather Denim Short Dress.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['dress', 'denim', 'peacock', 'short'],
    colors: ['Black', 'Brown'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 26,
    name: 'Peacock Denim Loose Pants',
    arabicName: 'بنطلون دينم فضفاض طاووس',
    description: 'Comfortable loose pants with peacock denim design; relaxed fit for casual elegance.',
    price: 11500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/Peacos Denim Light Blue And Dark Loose Pants.jpg'),
    rating: 4.6,
    inStock: true,
    tags: ['pants', 'denim', 'loose', 'casual'],
    colors: ['Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 27,
    name: 'Vintage Peacock Leather Biker Jacket',
    arabicName: 'جاكيت بايكر جلد كلاسيكي',
    description: 'Classic biker jacket with vintage peacock leather finish; timeless rebellious style.',
    price: 22500,
    category: 'Clothes',
    image: img('HIGHLITS/Denim/VINTAGE PEACOCK LEATHER BIKER JACKET.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Featured',
    tags: ['jacket', 'leather', 'biker', 'vintage'],
    colors: ['Black', 'Brown'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 28,
    name: 'Draped Jersey Knotted Black Dress',
    arabicName: 'فستان جيرسي أسود مربوط',
    description: 'Elegant draped jersey dress with knot detail and peacock print; fluid and graceful.',
    price: 16500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/DRAPED JERSEY KNOTTED BLACK DRESS WITH PEACOCK PRINT.jpg'),
    rating: 4.8,
    inStock: true,
    tags: ['dress', 'jersey', 'black', 'draped'],
    colors: ['Black',  'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 29,
    name: 'Golden Peacock Majesty Long Dress',
    arabicName: 'فستان طويل طاووس ذهبي',
    description: 'Majestic long black dress with golden peacock details; royal elegance for grand events.',
    price: 29500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/GOLDEN PEACOCK MAJESTY LONG BLACK DRESS.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Premium',
    tags: ['dress', 'long', 'gold', 'peacock'],
    colors: ['Gold', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 30,
    name: 'Mesh Flock Mini Crewneck Dress',
    arabicName: 'فستان قصير شبكي',
    description: 'Chic mini dress in mesh flock with crewneck; modern texture for contemporary style.',
    price: 14500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/PEACOCK MESH FLOCK LS MINI CREWNECK DRESS.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['dress', 'mesh', 'mini', 'modern'],
    colors: ['Black', 'Red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 31,
    name: 'Mesh Flock Straps Top',
    arabicName: 'توب شبكي بحمالات',
    description: 'Trendy mesh flock top with straps; versatile piece for layering or standalone wear.',
    price: 8500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/PEACOCK MESH FLOCK STRAPS TOP.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'New',
    tags: ['top', 'mesh', 'straps', 'trendy'],
    colors: ['Red', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 32,
    name: 'Mesh Flock Cover-ups',
    arabicName: 'غطاء شبكي',
    description: 'Elegant mesh flock cover-up; perfect layering piece for sophisticated looks.',
    price: 9500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/PEACOCK MESHFLOCK COVER-UPS.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['cover-up', 'mesh', 'layering', 'elegant'],
    colors: ['Red', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 33,
    name: 'Red Cropped Mesh Flock Top',
    arabicName: 'توب قصير أحمر شبكي',
    description: 'Bold red cropped top with mesh flock texture and peacock monogram; statement piece.',
    price: 8900,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/PEACOCK MONOGRAM MESH FLOCK LS RED CROPPED TOP.jpg'),
    rating: 4.8,
    inStock: true,
    badge: 'Featured',
    tags: ['top', 'cropped', 'red', 'mesh'],
    colors: ['Red', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 34,
    name: 'The Gilded Peacock Gala Gown',
    arabicName: 'فستان سهرة طاووس ذهبي',
    description: 'Spectacular gala gown with gilded peacock details; ultimate luxury for special occasions.',
    price: 32500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/The Gilded Peacock Gala Gown.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Premium',
    tags: ['gown', 'gala', 'gold', 'luxury'],
    colors: ['Gold', 'Champagne', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 35,
    name: 'Obsidian Crown Gown',
    arabicName: 'فستان تاج Obsidian',
    description: 'Long black gown with obsidian crown-inspired design; regal and mysterious elegance.',
    price: 28500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/The Obsidian Crown Gown long black dress.jpg'),
    rating: 4.9,
    inStock: true,
    badge: 'Best Seller',
    tags: ['gown', 'black', 'long', 'regal'],
    colors: ['Black', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 36,
    name: 'Zafira Dark Red Velvet Muse',
    arabicName: 'فستان مخمل أحمر داكن',
    description: 'Luxurious dark red velvet dress with gold peacock print; romantic and opulent.',
    price: 26500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/The Zafira black in dark red Velvet Muse with gold peacock print.jpg'),
    rating: 4.8,
    inStock: true,
    tags: ['dress', 'velvet', 'red', 'gold'],
    colors: ['Dark Red', 'Burgundy', 'Crimson'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 37,
    name: 'Black Zafira Mini Monogram Set',
    arabicName: 'طقم زفيرا أسود ميني',
    description: 'Stylish black set with mini peacock monogram; coordinated pieces for chic ensembles.',
    price: 19500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/The black Zafira Set with mini peacock monogram.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['set', 'black', 'monogram', 'chic'],
    colors: ['Black', 'Off-White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 38,
    name: 'Modern Heritage Knitted Set',
    arabicName: 'طقم محاك تراثي حديث',
    description: 'Contemporary knitted shell set blending modern design with heritage elements.',
    price: 17500,
    category: 'Clothes',
    image: img('HIGHLITS/MESH/Modern Heritage Knitted black shell Set.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'New',
    tags: ['set', 'knitted', 'modern', 'heritage'],
    colors: ['Black', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 39,
    name: 'Denim Laser Blue Bustier Top',
    arabicName: 'توب دينم أزرق ليزر',
    description: 'Fashion-forward denim bustier top with laser-cut blue peacock pattern; bold and contemporary.',
    price: 10500,
    category: 'Clothes',
    image: img('HIGHLITS/BAGS/Peacock laser black blue denim bustier Top.jpg'),
    rating: 4.7,
    inStock: true,
    tags: ['top', 'denim', 'bustier', 'laser'],
    colors: [  'Black','Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 40,
    name: 'See-Through Brown Peacock Shopping Bag',
    arabicName: 'حقيبة تسوق شفافة بنية',
    description: 'Trendy see-through shopping bag with brown peacock design; practical yet fashionable.',
    price: 6800,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/SEE-THROUGH BROWN PEACOCK SHOPPING BAG.jpg'),
    rating: 4.5,
    inStock: true,
    tags: ['bag', 'see-through', 'brown', 'shopping'],
    colors: ['Brown', 'Tan', 'Chocolate'],
    sizes: ['One Size']
  },
  {
    id: 41,
    name: 'Peacock Screenprint Leather Card Holder',
    arabicName: 'حامل بطاقات جلدي مطبوع طاووس',
    description: 'Multi-pocket card holder wallet with peacock printed leather exterior lining. Leather and peacock jacquard interior lining with foiled logo patch inside. Dimensions: 10 x 7 cm.',
    price: 180,
    category: 'Bags',
    image: img('HIGHLITS/BAGS/PEACOCK SCREENPRINT LEATHER CARD HOLDER.jpg'),
    rating: 4.6,
    inStock: true,
    badge: 'New',
 tags: ['gift box', 'luxury', 'peacock', 'special occasions'],
    colors: ['Black', 'Gold'],
    sizes: ['One Size']  },
  // ------------------Packaging Category------------------
  {
    id: 42,
    name: 'Luxury Gift Box',
    arabicName: 'صندوق هدايا فاخر',
    description: 'Elegant luxury gift box with peacock motif design, perfect for special occasions and premium packaging.',
    price: 450,
    category: 'Packaging',
    image: img('packiging/1.jpeg'),
    rating: 4.8,
    inStock: true,
    tags: ['gift box', 'luxury', 'peacock', 'special occasions'],
    colors: ['Black', 'Gold', 'Burgundy'],    sizes: ['One Size']
  },
  {
    id: 43,
    name: 'Designer Shopping Bag',
    arabicName: 'حقيبة تسوق مصممة',
    description: 'Premium designer shopping bag with reinforced handles and elegant peacock branding.',
    price: 280,
    category: 'Packaging',
    image: img('packiging/2.jpeg'),
    rating: 4.6,
    inStock: true,
    tags: ['shopping bag', 'designer', 'premium', 'peacock branding'],
    colors: ['Black', 'Gold', 'Burgundy'],    sizes: ['One Size']
  },
  {
    id: 44,
    name: 'Silk Wrapping Paper Set',
    arabicName: 'مجموعة ورق تغليف حرير',
    description: 'High-quality silk wrapping paper set with peacock patterns for luxury gift presentation.',
    price: 320,
    category: 'Packaging',
    image: img('packiging/3.jpeg'),
    rating: 4.7,
    inStock: true,
    badge: 'New',
    tags: ['wrapping paper', 'silk', 'luxury', 'peacock patterns'],
    colors: ['Black', 'Gold', 'Burgundy'],    sizes: ['One Size']
  },
  {
    id: 45,
    name: 'Premium Gift Wrap Kit',
    arabicName: 'مجموعة تغليف هدايا فاخرة',
    description: 'Complete premium gift wrap kit including ribbons, tags, and luxury paper with peacock theme.',
    price: 580,
    category: 'Packaging',
    image: img('packiging/4.jpeg'),
    rating: 4.9,
    inStock: true,
    tags: ['gift wrap kit', 'premium', 'ribbons', 'complete set'],
    colors: ['Black', 'Gold', 'Burgundy'],
    sizes: ['One Size']
  },
  {
    id: 46,
    name: 'Elegant Tissue Paper',
    arabicName: 'ورق مناديل أنيق',
    description: 'Delicate tissue paper with subtle peacock imprint for luxury packaging and protection.',
    price: 150,
    category: 'Packaging',
    image: img('packiging/5.jpeg'),
    rating: 4.5,
    inStock: true,
    tags: ['tissue paper', 'delicate', 'protection', 'peacock imprint'],
    colors: ['Black', 'Gold'],
    sizes: ['One Size']
  },
  {
    id: 47,
    name: 'Designer Gift Tags',
    arabicName: 'وسم هدايا مصمم',
    description: 'Set of designer gift tags with peacock artwork and premium cardstock quality.',
    price: 95,
    category: 'Packaging',
    image: img('packiging/6.jpeg'),
    rating: 4.4,
    inStock: true,
    tags: ['gift tags', 'designer', 'cardstock', 'peacock artwork'],
    colors: ['Black', 'Gold'],
    sizes: ['One Size']
  },
  {
    id: 48,
    name: 'Luxury Ribbon Collection',
    arabicName: 'مجموعة شرائط فاخرة',
    description: 'Collection of luxury ribbons in various colors and textures with peacock-themed designs.',
    price: 220,
    category: 'Packaging',
    image: img('packiging/7.jpeg'),
    rating: 4.7,
    inStock: true,
    tags: ['ribbons', 'luxury', 'collection', 'various colors'],
      colors: ['Gold', 'Silver', 'Black'],
    sizes: ['One Size']
  },
  {
    id: 49,
    name: 'Premium Packaging Set',
    arabicName: 'مجموعة تغليف فاخرة',
    description: 'Complete premium packaging set with boxes, paper, ribbons, and accessories for luxury gifts.',
    price: 750,
    category: 'Packaging',
    image: img('packiging/8.jpeg'),
    rating: 4.8,
    inStock: true,
    badge: 'Limited',
    tags: ['packaging set', 'complete', 'luxury gifts', 'accessories'],
    colors: ['Black', 'Gold'],
    sizes: ['One Size']
  },
];

export const featuredProducts = products.filter(p => p.badge);

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') return products;
  return products.filter(p => p.category === categoryId);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(lowerQuery);
    const matchesArabicName = p.arabicName.toLowerCase().includes(lowerQuery);
    const matchesDescription = p.description.toLowerCase().includes(lowerQuery);
    const matchesCategory = p.category.toLowerCase().includes(lowerQuery);
    const matchesTags = p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;
    
    return matchesName || matchesArabicName || matchesDescription || matchesCategory || matchesTags;
  });
};

// Advanced search with filters
export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  badge?: string;
}

export const advancedSearch = (query: string, filters?: SearchFilters): Product[] => {
  let results = searchProducts(query);
  
  if (filters) {
    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.inStock !== undefined) {
      results = results.filter(p => p.inStock === filters.inStock);
    }
    if (filters.badge) {
      results = results.filter(p => p.badge === filters.badge);
    }
  }
  
  return results;
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  products.forEach(p => {
    p.tags?.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

// Get price range
export const getPriceRange = (): { min: number; max: number } => {
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
