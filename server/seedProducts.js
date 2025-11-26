require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const categories = ['Electronics', 'Sports', 'Home', 'Accessories'];
const products = [];

const generateProducts = () => {
    categories.forEach(category => {
        for (let i = 1; i <= 20; i++) {
            let image = '';
            let name = '';
            let description = '';
            let price = 0;

            switch (category) {
                case 'Electronics':
                    image = `https://images.unsplash.com/photo-${[
                        '1505740420928-5e560c06d30e', '1523275335684-37898b6baf30', '1526170375885-4d8ecf77b99f', '1587829741301-dc798b83add3', '1608043152269-423dbba4e7e1'
                    ][i % 5]}?w=500`;
                    name = `${category} Item ${i}`;
                    description = `High quality ${category} product with premium features.`;
                    price = Math.floor(Math.random() * 500) + 50;
                    break;
                case 'Sports':
                    image = `https://images.unsplash.com/photo-${[
                        '1601925260368-ae2f83cf8b7f', '1542291026-7eec264c27ff', '1517836357463-d25dfeac3438', '1598289431512-b97b0917affc', '1584735935682-2f8b660ecc64'
                    ][i % 5]}?w=500`;
                    name = `${category} Gear ${i}`;
                    description = `Professional grade ${category} equipment for your workout.`;
                    price = Math.floor(Math.random() * 200) + 20;
                    break;
                case 'Home':
                    image = `https://images.unsplash.com/photo-${[
                        '1517668808822-9ebb02f2a0e6', '1507473885765-e6ed057f782c', '1585771724684-38269d6639fd', '1556909114-f6e7ad7d3136', '1570222094114-d054a817e56b'
                    ][i % 5]}?w=500`;
                    name = `${category} Essentials ${i}`;
                    description = `Modern ${category} appliance for your daily needs.`;
                    price = Math.floor(Math.random() * 300) + 30;
                    break;
                case 'Accessories':
                    image = `https://images.unsplash.com/photo-${[
                        '1553062407-98eeb64c6a62', '1602143407151-7111542de6e8', '1511499767150-a48a237f0083', '1565026057447-bc90a3dceb87', '1601784551446-20c9e07cdbdb'
                    ][i % 5]}?w=500`;
                    name = `${category} Collection ${i}`;
                    description = `Stylish ${category} to complement your look.`;
                    price = Math.floor(Math.random() * 100) + 15;
                    break;
            }

            products.push({
                name: name,
                description: description,
                price: price + 0.99,
                image: image,
                category: category,
                rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
                numReviews: Math.floor(Math.random() * 500),
                countInStock: Math.floor(Math.random() * 100)
            });
        }
    });
};

generateProducts();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('25 products seeded successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
