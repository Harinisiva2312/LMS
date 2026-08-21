const quizData = {
  /* ================= HTML & CSS ================= */
  "html-css": {
    1: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Trainer Marking Language",
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Tool Multi Language"
        ],
        answer: 1
      },
      {
        id: 2,
        question: "Which tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: 2
      },
      {
        id: 3,
        question: "HTML is used to?",
        options: [
          "Style web pages",
          "Structure web content",
          "Program logic",
          "Store data"
        ],
        answer: 1
      },
      {
        id: 4,
        question: "Which tag is used to create a link?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
      },
      {
        id: 5,
        question: "Which HTML tag is used to insert an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: 1
      }
    ]
  },

  /* ================= JavaScript ================= */
  javascript: {
    1: [
      {
        id: 1,
        question: "JavaScript is a ____ language.",
        options: ["Markup", "Styling", "Programming", "Database"],
        answer: 2
      },
      {
        id: 2,
        question: "Which keyword is used to declare variables?",
        options: ["int", "var", "string", "define"],
        answer: 1
      },
      {
        id: 3,
        question: "Where does JavaScript run?",
        options: [
          "Browser only",
          "Server only",
          "Both browser and server",
          "Compiler"
        ],
        answer: 2
      },
      {
        id: 4,
        question: "Which symbol is used for comments in JavaScript?",
        options: ["#", "//", "<!-- -->", "**"],
        answer: 1
      },
      {
        id: 5,
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: 2
      }
    ]
  },

  /* ================= Python ================= */
  python: {
    1: [
      {
        id: 1,
        question: "Python is a ____ language.",
        options: ["Low-level", "Machine-level", "High-level", "Assembly"],
        answer: 2
      },
      {
        id: 2,
        question: "Which keyword is used to define a function?",
        options: ["func", "define", "def", "function"],
        answer: 2
      },
      {
        id: 3,
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "<!-- -->", "/* */"],
        answer: 1
      },
      {
        id: 4,
        question: "Which data type is immutable?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        answer: 2
      },
      {
        id: 5,
        question: "Who created Python?",
        options: [
          "Dennis Ritchie",
          "James Gosling",
          "Guido van Rossum",
          "Bjarne Stroustrup"
        ],
        answer: 2
      }
    ]
  },

  /* ================= MERN ================= */
  mern: {
    1: [
      {
        id: 1,
        question: "What does MERN stand for?",
        options: [
          "MongoDB, Express, React, Node",
          "MySQL, Express, React, Node",
          "MongoDB, Ember, React, Node",
          "MongoDB, Express, Redux, Node"
        ],
        answer: 0
      },
      {
        id: 2,
        question: "Which library is used for frontend in MERN?",
        options: ["Node.js", "MongoDB", "React", "Express"],
        answer: 2
      },
      {
        id: 3,
        question: "Which is used for backend?",
        options: ["React", "CSS", "Node.js", "HTML"],
        answer: 2
      },
      {
        id: 4,
        question: "Which database is used in MERN?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        answer: 2
      },
      {
        id: 5,
        question: "Express.js is a ____ framework.",
        options: ["Frontend", "Database", "Backend", "CSS"],
        answer: 2
      }
    ]
  },

  /* ================= SQL ================= */
  sql: {
    1: [
      {
        id: 1,
        question: "SQL stands for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "System Query Language",
          "Standard Query List"
        ],
        answer: 0
      },
      {
        id: 2,
        question: "Which command is used to fetch data?",
        options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
        answer: 1
      },
      {
        id: 3,
        question: "Which is a type of database?",
        options: ["HTML", "CSS", "MySQL", "React"],
        answer: 2
      },
      {
        id: 4,
        question: "Which key uniquely identifies a record?",
        options: ["Foreign key", "Candidate key", "Primary key", "Alternate key"],
        answer: 2
      },
      {
        id: 5,
        question: "Which command removes a table?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: 2
      }
    ]
  },

  /* ================= AI & ML ================= */
  "ai-ml": {
    1: [
      {
        id: 1,
        question: "AI stands for?",
        options: [
          "Automatic Intelligence",
          "Artificial Intelligence",
          "Advanced Internet",
          "Applied Information"
        ],
        answer: 1
      },
      {
        id: 2,
        question: "Machine Learning is a subset of?",
        options: [
          "Data Science",
          "Web Development",
          "Artificial Intelligence",
          "Cyber Security"
        ],
        answer: 2
      },
      {
        id: 3,
        question: "Which is an example of AI?",
        options: ["Calculator", "Text Editor", "Self-driving car", "Notepad"],
        answer: 2
      },
      {
        id: 4,
        question: "Which algorithm is used in ML?",
        options: ["Sorting", "Linear Regression", "DFS", "Binary Search"],
        answer: 1
      },
      {
        id: 5,
        question: "Which field uses NLP?",
        options: ["Image processing", "Speech recognition", "Databases", "Networking"],
        answer: 1
      }
    ]
  }
};

export default quizData;