// Mock data - will be replaced with Firebase data
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  imageUrl: string;
}

export const categories: Category[] = [
  { id: 'food', name: 'Food & Snacks', icon: '🍕' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'jewelry', name: 'Jewelry', icon: '💎' },
];

export const products: Product[] = [
  // Food
  {
    id: 'f1',
    name: 'Organic Honey Jar',
    price: 2500,
    categoryId: 'food',
    description: 'Pure organic honey sourced from local farms. Perfect for your morning tea or cooking.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
  },
  {
    id: 'f2',
    name: 'Premium Coffee Beans',
    price: 4500,
    categoryId: 'food',
    description: 'Freshly roasted arabica coffee beans with rich, bold flavor notes.',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
  },
  {
    id: 'f3',
    name: 'Artisan Chocolate Box',
    price: 3500,
    categoryId: 'food',
    description: 'Handcrafted chocolates with various flavors. Perfect gift for any occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop',
  },
  // Clothing
  {
    id: 'c1',
    name: 'Classic Cotton T-Shirt',
    price: 8000,
    categoryId: 'clothing',
    description: 'Comfortable 100% cotton t-shirt with a relaxed fit. Available in multiple colors.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 'c2',
    name: 'Denim Jacket',
    price: 25000,
    categoryId: 'clothing',
    description: 'Timeless denim jacket with a modern cut. Perfect for layering.',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop',
  },
  {
    id: 'c3',
    name: 'Summer Dress',
    price: 18000,
    categoryId: 'clothing',
    description: 'Light and breezy summer dress with floral patterns. Perfect for warm days.',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
  },
  // Bags
  {
    id: 'b1',
    name: 'Leather Tote Bag',
    price: 35000,
    categoryId: 'bags',
    description: 'Spacious genuine leather tote bag with multiple compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
  },
  {
    id: 'b2',
    name: 'Canvas Backpack',
    price: 15000,
    categoryId: 'bags',
    description: 'Durable canvas backpack perfect for daily use or travel.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  },
  {
    id: 'b3',
    name: 'Crossbody Bag',
    price: 22000,
    categoryId: 'bags',
    description: 'Stylish crossbody bag with adjustable strap. Great for on-the-go.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
  },
  // Jewelry
  {
    id: 'j1',
    name: 'Gold Pendant Necklace',
    price: 45000,
    categoryId: 'jewelry',
    description: 'Elegant 18k gold pendant necklace with delicate chain.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  },
  {
    id: 'j2',
    name: 'Silver Hoop Earrings',
    price: 12000,
    categoryId: 'jewelry',
    description: 'Classic sterling silver hoop earrings. Lightweight and comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&h=400&fit=crop',
  },
  {
    id: 'j3',
    name: 'Beaded Bracelet Set',
    price: 8500,
    categoryId: 'jewelry',
    description: 'Set of 3 handcrafted beaded bracelets with natural stones.',
    imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
  },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (categoryId: string) => 
  categoryId === 'all' ? products : products.filter(p => p.categoryId === categoryId);
export const getCategoryById = (id: string) => categories.find(c => c.id === id);
