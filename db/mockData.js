const { faker } = require("@faker-js/faker");
const fakeData = [];

// Function to generate a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const articles = [];

for (let i = 0; i < 100; i++) {
  const article = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    votes: getRandomNumber(50, 100),
    userId: getRandomNumber(1, 3),
  };
  articles.push(article);
}

fakeData.push({ articles });

const comments = [];

for (let i = 0; i < 200; i++) {
  const comment = {
    body: faker.lorem.sentence(),
    votes: getRandomNumber(5, 30),
    userId: getRandomNumber(1, 3),
    articleId: getRandomNumber(1, 10),
  };
  comments.push(comment);
}

fakeData.push({ comments });

const users = [
  {
    username: "joebloggs",
    name: "Joe Bloggs",
    email: "joebloggs@example.com",
    avatar_URL: "https://example.com/avatar/joebloggs.jpg",
  },
  {
    username: "sarahsmith",
    name: "Sarah Smith",
    email: "sarahsmith@gmail.com",
    avatar_URL: "https://example.com/avatar/sarahsmith.png",
  },
  {
    username: "markjones",
    name: " Mark Jones",
    email: "markjones@yahoo.com",
    avatar_URL: "https://example.com/avatar/markjones.jpeg",
  },
];

fakeData.push({ users });

module.exports = { articles, comments, users };
