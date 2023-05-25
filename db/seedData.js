const articles = [
  {
    title: "How to Stay Productive While Working Remotely",
    body: "With more people working from home than ever before, it's important to stay productive and avoid distractions. By setting clear goals, establishing a routine, and creating a dedicated workspace, you can stay on track and achieve your work objectives.",
    votes: 100,
    userId: 1,
  },
  {
    title: " The Benefits of Mindfulness Meditation",
    body: "Mindfulness meditation has become increasingly popular in recent years, and for good reason. It has been shown to have many benefits, such as reducing stress, improving focus, and promoting emotional well-being. Whether you're new to meditation or an experienced practitioner, mindfulness can have a positive impact on your life.",
    votes: 75,
    userId: 2,
  },
  {
    title: "The Importance of Networking for Career Development",
    body: "Networking is a key component of career development, as it can help you build relationships, learn new skills, and discover new opportunities. Whether you're attending industry events, connecting with colleagues on LinkedIn, or reaching out to mentors, networking can help you achieve your professional goals.",
    votes: 50,
    userId: 3,
  },
  {
    title: "The Benefits of a Plant-Based Diet",
    body: "A plant-based diet has many health benefits, such as reducing the risk of heart disease, cancer, and diabetes. By incorporating more fruits, vegetables, and whole grains into your diet, you can improve your overall health and reduce your environmental impact.",
    votes: 90,
    userId: 1,
  },
  {
    title: "Tips for Improving Your Writing Skills",
    body: "Whether you're a professional writer or just looking to improve your communication skills, there are many strategies you can use to become a better writer. From practicing regularly to reading widely, honing your writing skills can help you succeed in a variety of fields.",
    votes: 60,
    userId: 2,
  },
  {
    title: "The Importance of Mental Health Awareness",
    body: "Mental health issues affect millions of people around the world, and it's important to raise awareness and reduce stigma. By promoting mental health education and support, we can improve access to care and help those who are struggling with mental illness.",
    votes: 80,
    userId: 3,
  },
  {
    title: "The Benefits of Regular Exercise",
    body: " Regular exercise has many benefits, such as improving cardiovascular health, reducing the risk of chronic disease, and boosting mood and energy levels. By making exercise a part of your daily routine, you can improve your overall health and quality of life.",
    votes: 70,
    userId: 1,
  },
  {
    title: "The Impact of Social Media on Society",
    body: "Social media has transformed the way we communicate and connect with each other. While it has many benefits, such as fostering community and promoting activism, there are also concerns about the impact of social media on mental health, privacy, and democracy.",
    votes: 65,
    userId: 2,
  },
  {
    title: "The Ethics of Artificial Intelligence",
    body: "As artificial intelligence becomes more advanced, there are important ethical considerations to be addressed. From bias in algorithms to the impact on job displacement, it's important to consider the potential consequences of AI and ensure that it is developed and used responsibly.",
    votes: 95,
    userId: 3,
  },
  {
    title: "The Benefits of Yoga",
    body: "Yoga has been practiced for thousands of years and has many benefits, such as reducing stress, improving flexibility, and promoting relaxation. If you're looking to improve your physical and mental health, give yoga a try.",
    votes: 85,
    userId: 1,
  },
];

const comments = [
  {
    body: "These are great tips! I've been struggling with staying focused while working from home, but creating a dedicated workspace has made a huge difference. Thanks for sharing.",
    votes: 20,
    userId: 2,
    articleId: 1,
  },
  {
    body: "I agree, establishing a routine has been key for me. It helps me stay on track and make the most of my workday. Thanks for the helpful advice!",
    votes: 15,
    userId: 3,
    articleId: 1,
  },
  {
    body: "I've been meditating for a few months now, and it's really helped me manage my anxiety and improve my focus. It's great to see more people talking about the benefits of mindfulness.",
    votes: 25,
    userId: 1,
    articleId: 2,
  },
  {
    body: "I've been curious about trying mindfulness meditation, but I'm not sure where to start. Do you have any resources or tips for beginners?",
    votes: 10,
    userId: 3,
    articleId: 2,
  },
  {
    body: "Networking has been a game-changer for me in terms of finding new job opportunities and advancing my career. It's great to see more people recognizing its importance.",
    votes: 30,
    userId: 1,
    articleId: 3,
  },
  {
    body: "I've always struggled with networking, but your article has inspired me to give it another try. Thanks for the motivation!",
    votes: 15,
    userId: 2,
    articleId: 3,
  },
  {
    body: "I switched to a plant-based diet a few months ago, and I've noticed a huge improvement in my energy levels and overall health. It's not always easy to find plant-based options, but it's definitely worth it.",
    votes: 35,
    userId: 2,
    articleId: 4,
  },
  {
    body: "I'm not sure I could ever give up meat entirely, but I appreciate the information about the benefits of plant-based eating. It's definitely something to consider!",
    votes: 20,
    userId: 3,
    articleId: 4,
  },
  {
    body: "These are really helpful tips! As someone who struggles with writing, I appreciate the practical advice.",
    votes: 25,
    userId: 1,
    articleId: 5,
  },
  {
    body: "I've been trying to improve my writing skills for a while, but I always feel like I'm stuck. Your article has given me some new ideas to try. Thank you!",
    votes: 20,
    userId: 3,
    articleId: 5,
  },
  {
    body: "Thank you for raising awareness about mental health. As someone who has struggled with anxiety and depression, it's so important to reduce the stigma and promote education and support.",
    votes: 30,
    userId: 1,
    articleId: 6,
  },
  {
    body: "I appreciate the emphasis on promoting mental health education and support. We need to do more to ensure that everyone has access to the care they need.",
    votes: 20,
    userId: 2,
    articleId: 6,
  },
  {
    body: "I love exercising regularly! It's so important to take care of your physical health, and exercise is a great way to do that. Thanks for highlighting this!",
    votes: 17,
    userId: 2,
    articleId: 7,
  },

  {
    body: "I struggle with motivation sometimes. Do you have any tips for staying motivated and making exercise a regular part of your routine?",
    votes: 8,
    userId: 3,
    articleId: 7,
  },
  {
    body: "These are great tips for anyone looking to improve their public speaking skills. As someone who used to struggle with public speaking, I can attest to the importance of practice and preparation.",
    votes: 14,
    userId: 1,
    articleId: 8,
  },
  {
    body: "I've always been a confident speaker, but I think these tips are helpful for anyone looking to improve their communication skills. Thanks for sharing!",
    votes: 6,
    userId: 3,
    articleId: 8,
  },
  {
    body: "I've been interested in minimalism for a few years now, and I think it's a great way to simplify your life and focus on what's really important. Thanks for sharing these tips!",
    votes: 11,
    userId: 2,
    articleId: 9,
  },
  {
    body: "I've been feeling overwhelmed by all the clutter in my life lately, and I think minimalism could be a helpful solution. Do you have any resources or advice for getting started?",
    votes: 5,
    userId: 1,
    articleId: 9,
  },
  {
    body: "These are great tips for anyone looking to get more involved in their local community. I've found that volunteering is a great way to make a difference and meet new people.",
    votes: 13,
    userId: 2,
    articleId: 10,
  },
  {
    body: "I've been looking for ways to get more involved in my community, and I think these tips are really helpful. Thanks for sharing!",
    votes: 7,
    userId: 3,
    articleId: 10,
  },
];

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

module.exports = { articles, comments, users };
