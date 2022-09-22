require('../config/db.config')
const { Stream } = require('../models');

const { faker } = require('@faker-js/faker');

Stream
  .deleteMany({})
  .then(() => {
      for (let i = 0; i < 20; i++) {
        Stream
          .create({
            title: faker.music.songName(),
            author: faker.name.firstName(),
            url: faker.internet.url(),
            description: faker.lorem.paragraph(),
            views: Math.floor(Math.random() * 1000000),
            category: faker.music.genre(),
            duration: Math.floor(Math.random() * 180),
            thumbnail: faker.image.abstract(undefined, undefined, true),
            private: Math.random() < 0.5
          })
          .then(stream => console.info(`stream ${stream.title} created`))
      }
    }
  )
  .catch(error => console.error(error))

