const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Sample products data
const products = [
  {
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    price: 170,
    description: 'The Air Jordan 1 Retro High OG brings back the iconic silhouette that started it all. Premium leather construction with signature colorways.',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 15 },
      { size: 8, stock: 20 },
      { size: 9, stock: 25 },
      { size: 10, stock: 30 },
      { size: 11, stock: 20 },
      { size: 12, stock: 10 }
    ],
    colors: ['Red', 'Black', 'White'],
    rating: 4.8,
    numReviews: 245,
    featured: true,
    trending: true,
    isNewArrival: true,
    discount: 0
  },
  {
    name: 'Nike Air Max 90',
    brand: 'Nike',
    price: 130,
    description: 'Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its roots with the iconic Waffle sole.',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800'
    ],
    category: 'Casual',
    sizes: [
      { size: 7, stock: 12 },
      { size: 8, stock: 18 },
      { size: 9, stock: 22 },
      { size: 10, stock: 28 },
      { size: 11, stock: 15 },
      { size: 12, stock: 8 }
    ],
    colors: ['White', 'Grey', 'Black'],
    rating: 4.6,
    numReviews: 189,
    featured: true,
    trending: false,
    isNewArrival: false,
    discount: 10
  },
  {
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    price: 190,
    description: 'Experience incredible energy return with Boost cushioning. The Ultraboost 22 delivers exceptional comfort for running and everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=800',
      'https://images.unsplash.com/photo-1617606002779-51d866d5a5ca?w=800'
    ],
    category: 'Running',
    sizes: [
      { size: 7, stock: 10 },
      { size: 8, stock: 15 },
      { size: 9, stock: 20 },
      { size: 10, stock: 25 },
      { size: 11, stock: 18 },
      { size: 12, stock: 12 }
    ],
    colors: ['Black', 'White', 'Blue'],
    rating: 4.7,
    numReviews: 156,
    featured: true,
    trending: true,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'Nike Dunk Low Retro',
    brand: 'Nike',
    price: 110,
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors.',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 20 },
      { size: 8, stock: 25 },
      { size: 9, stock: 30 },
      { size: 10, stock: 35 },
      { size: 11, stock: 25 },
      { size: 12, stock: 15 }
    ],
    colors: ['Black', 'White', 'Panda'],
    rating: 4.5,
    numReviews: 312,
    featured: false,
    trending: true,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'New Balance 550',
    brand: 'New Balance',
    price: 120,
    description: 'Originally a basketball shoe from 1989, the New Balance 550 returns with a minimalist silhouette and premium materials.',
    images: [
      'https://images.unsplash.com/photo-1605733513597-f3f2f0b1b1a7?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 8 },
      { size: 8, stock: 12 },
      { size: 9, stock: 16 },
      { size: 10, stock: 20 },
      { size: 11, stock: 14 },
      { size: 12, stock: 10 }
    ],
    colors: ['White', 'Green', 'Grey'],
    rating: 4.4,
    numReviews: 98,
    featured: false,
    trending: true,
    isNewArrival: true,
    discount: 15
  },
  {
    name: 'Adidas Samba Classic',
    brand: 'Adidas',
    price: 85,
    description: 'The legendary Adidas Samba brought from the soccer field to the streets. Timeless design with suede overlays.',
    images: [
      'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800'
    ],
    category: 'Casual',
    sizes: [
      { size: 7, stock: 15 },
      { size: 8, stock: 20 },
      { size: 9, stock: 25 },
      { size: 10, stock: 30 },
      { size: 11, stock: 22 },
      { size: 12, stock: 18 }
    ],
    colors: ['Black', 'White'],
    rating: 4.7,
    numReviews: 421,
    featured: true,
    trending: false,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'Puma RS-X',
    brand: 'Puma',
    price: 100,
    description: 'Bold and chunky, the RS-X brings maximum style with its radical design and vibrant colorways.',
    images: [
      'https://images.unsplash.com/photo-1609939786410-ce1b1d0e3096?w=800'
    ],
    category: 'Casual',
    sizes: [
      { size: 7, stock: 10 },
      { size: 8, stock: 14 },
      { size: 9, stock: 18 },
      { size: 10, stock: 22 },
      { size: 11, stock: 16 },
      { size: 12, stock: 12 }
    ],
    colors: ['Multi', 'Black', 'White'],
    rating: 4.3,
    numReviews: 87,
    featured: false,
    trending: false,
    isNewArrival: true,
    discount: 20
  },
  {
    name: 'Nike Air Force 1 Low',
    brand: 'Nike',
    price: 110,
    description: 'The radiance lives on in the Nike Air Force 1 Low. Crossing hardwood comfort with off-court style.',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 25 },
      { size: 8, stock: 30 },
      { size: 9, stock: 35 },
      { size: 10, stock: 40 },
      { size: 11, stock: 30 },
      { size: 12, stock: 20 }
    ],
    colors: ['White', 'Black', 'Triple White'],
    rating: 4.9,
    numReviews: 567,
    featured: true,
    trending: true,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'Jordan 4 Retro',
    brand: 'Jordan',
    price: 200,
    description: 'The Air Jordan 4 Retro brings back the classic look with premium materials and iconic design elements.',
    images: [
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800'
    ],
    category: 'Basketball',
    sizes: [
      { size: 7, stock: 8 },
      { size: 8, stock: 12 },
      { size: 9, stock: 15 },
      { size: 10, stock: 18 },
      { size: 11, stock: 14 },
      { size: 12, stock: 10 }
    ],
    colors: ['Black', 'Red', 'Cement'],
    rating: 4.8,
    numReviews: 203,
    featured: true,
    trending: true,
    isNewArrival: true,
    discount: 0
  },
  {
    name: 'New Balance 574',
    brand: 'New Balance',
    price: 85,
    description: 'An icon since 1988, the New Balance 574 combines comfort with classic style for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'
    ],
    category: 'Casual',
    sizes: [
      { size: 7, stock: 18 },
      { size: 8, stock: 22 },
      { size: 9, stock: 26 },
      { size: 10, stock: 30 },
      { size: 11, stock: 24 },
      { size: 12, stock: 16 }
    ],
    colors: ['Grey', 'Navy', 'Black'],
    rating: 4.5,
    numReviews: 276,
    featured: false,
    trending: false,
    isNewArrival: false,
    discount: 10
  },
  {
    name: 'Adidas Gazelle',
    brand: 'Adidas',
    price: 90,
    description: 'The adidas Gazelle is a timeless silhouette with a rich heritage, featuring premium suede upper.',
    images: [
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800'
    ],
    category: 'Casual',
    sizes: [
      { size: 7, stock: 14 },
      { size: 8, stock: 18 },
      { size: 9, stock: 22 },
      { size: 10, stock: 26 },
      { size: 11, stock: 20 },
      { size: 12, stock: 14 }
    ],
    colors: ['Blue', 'Black', 'Red'],
    rating: 4.6,
    numReviews: 189,
    featured: false,
    trending: true,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'Puma Suede Classic',
    brand: 'Puma',
    price: 75,
    description: 'A timeless icon, the Puma Suede Classic has been a street style staple since 1968.',
    images: [
      'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 16 },
      { size: 8, stock: 20 },
      { size: 9, stock: 24 },
      { size: 10, stock: 28 },
      { size: 11, stock: 22 },
      { size: 12, stock: 18 }
    ],
    colors: ['Black', 'Red', 'Blue'],
    rating: 4.4,
    numReviews: 342,
    featured: false,
    trending: false,
    isNewArrival: false,
    discount: 25
  },
  {
    name: 'Nike React Infinity Run',
    brand: 'Nike',
    price: 160,
    description: 'Designed to help reduce injury, the Nike React Infinity Run delivers soft, stable cushioning for long-distance running.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    category: 'Running',
    sizes: [
      { size: 7, stock: 10 },
      { size: 8, stock: 14 },
      { size: 9, stock: 18 },
      { size: 10, stock: 22 },
      { size: 11, stock: 16 },
      { size: 12, stock: 12 }
    ],
    colors: ['Black', 'White', 'Pink'],
    rating: 4.7,
    numReviews: 134,
    featured: false,
    trending: false,
    isNewArrival: true,
    discount: 0
  },
  {
    name: 'Jordan 11 Retro',
    brand: 'Jordan',
    price: 220,
    description: 'The Air Jordan 11 Retro brings back one of MJs most iconic shoes with patent leather and a translucent outsole.',
    images: [
      'https://images.unsplash.com/photo-1603787081207-362bcef7f620?w=800'
    ],
    category: 'Basketball',
    sizes: [
      { size: 7, stock: 6 },
      { size: 8, stock: 10 },
      { size: 9, stock: 12 },
      { size: 10, stock: 15 },
      { size: 11, stock: 12 },
      { size: 12, stock: 8 }
    ],
    colors: ['Black', 'White', 'Concord'],
    rating: 4.9,
    numReviews: 298,
    featured: true,
    trending: true,
    isNewArrival: false,
    discount: 0
  },
  {
    name: 'Adidas NMD R1',
    brand: 'Adidas',
    price: 140,
    description: 'Blending heritage with innovation, the NMD R1 features Boost cushioning and a modern knit upper.',
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'
    ],
    category: 'Lifestyle',
    sizes: [
      { size: 7, stock: 12 },
      { size: 8, stock: 16 },
      { size: 9, stock: 20 },
      { size: 10, stock: 24 },
      { size: 11, stock: 18 },
      { size: 12, stock: 14 }
    ],
    colors: ['Black', 'White', 'Primeknit'],
    rating: 4.5,
    numReviews: 167,
    featured: false,
    trending: true,
    isNewArrival: false,
    discount: 15
  },
  {
    name: 'New Balance 990v5',
    brand: 'New Balance',
    price: 185,
    description: 'Made in USA, the 990v5 is a premium running shoe with superior cushioning and craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800'
    ],
    category: 'Running',
    sizes: [
      { size: 7, stock: 8 },
      { size: 8, stock: 12 },
      { size: 9, stock: 15 },
      { size: 10, stock: 18 },
      { size: 11, stock: 14 },
      { size: 12, stock: 10 }
    ],
    colors: ['Grey', 'Black', 'Navy'],
    rating: 4.8,
    numReviews: 145,
    featured: true,
    trending: false,
    isNewArrival: true,
    discount: 0
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@sneakerstore.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Insert users
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert products
    const createdProducts = await Product.create(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('🎉 Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin - Email: admin@sneakerstore.com, Password: admin123');
    console.log('User  - Email: john@example.com, Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
