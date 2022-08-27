const userSeeds = require('./userSeed.json');
const blogSeeds = require('./blogSeed.json');
const db = require('../config/connection');
const { Blog, User } = require('../models');

db.once('open', async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < blogSeeds.length; i++) {
      const { _id, blogAuthor } = await Blog.create(blogSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: blogAuthor },
        {
          $addToSet: {
            blogs: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});