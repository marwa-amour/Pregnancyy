require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Week = require('./models/week');
const Post = require('./models/post');
const Favorite = require('./models/favorite');
const Sport = require('./models/sport');

const seedUsers = async () => {
    try {
        await User.deleteMany();
        const mockUsers = [
            {
                firstName: 'marwa',
                lastName: 'amour',
                email: 'marwa@gmail.com',
                password: await bcrypt.hash('Marwa312!',10),
                role: 'Admin',
                menstrualCycle:Date.UTC(2023,7,8,0,0,0),
                height:163,
                weight:55
                
            },
            {
                firstName: 'yakot',
                lastName: 'amour',
                email: 'yakot@gmail.com',
                password: await bcrypt.hash('Yakot0106#',10),
                role: 'User',
                menstrualCycle:Date.UTC(2023,4,8,0,0,0),
                height:170,
                weight:63                
            }
        ];

    await User.create(mockUsers);
    console.log('Mockup users created successfully');

    } catch(error) {
        console.log('Error occured while seeding Users : ',error)
    }
};

const seedWeeks = async () => {
    try {
        await Week.deleteMany();

        const seedWeeksJson = require('./data/seedWeeks.json');
        
        await Week.insertMany(seedWeeksJson);

        console.log('Seed weeks added successfully');

    } catch(error) {
        console.log('Error occured while seeding weeks to database', error);
    }
};

const seedPosts = async () => {
    try {
        await Post.deleteMany();

        const seedPostsJson = require('./data/seedPost.json');

        await Post.create(seedPostsJson);

        console.log('Seed posts added successfully');

    } catch(error) {
        console.log('Error occured while seeding posts to database', error);
    }
};
const seedFavorite = async () => {
    try {
        await Favorite.deleteMany();

        const seedFavoritesJson = require('./data/seedFavorite.json');

        await Favorite.create(seedFavoritesJson);

        console.log('Seed Favorites added successfully');

    } catch(error) {
        console.log('Error occured while seeding favorites to database', error);
    }
};
const seedSport = async () => {
    try {
        await Sport.deleteMany();

        const seedSportsJson = require('./data/seedSport.json');

        await Sport.create(seedSportsJson);

        console.log('Seed sports added successfully');

    } catch(error) {
        console.log('Error occured while seeding sports to database', error);
    }
};
const seedAll = async () => {

    // Guard
    const arguments = process.argv;

    if (!arguments.includes('i-am-a-pro')) {
        console.log('WARNING!!');
        console.log('You are about to replace all the data in your database');
        console.log('with mockup / seed data ! This operation is ireversable !!');
        console.log('If you know what you are doing, add "i-am-a-pro" argument.');
        process.exit(1);
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Run the seed functions
    await seedUsers();
    await seedWeeks();
    await seedPosts();
    await seedFavorite();
    await seedSport();

    // Finish up
    console.log('Done seeding');
    process.exit(0);
}

seedAll();