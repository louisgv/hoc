function DatabaseServ() {
  console.log('DatabaseServ');

  var questions = [
    {
      question: "What are you less likely to leave home without?",
      category: "NONE",
      cr: 2,
      answers: [
        "Keys",
        "Wallet",
        "Phone",
        "ID"
      ],
      imgs: [
        'keys.png',
        'wallet.png',
        'phone.png',
        'id.png',
      ],
    },
    {
      question: "What is the the most common use of the phone?",
      category: "NONE",
      cr: 1,
      answers: [
        "Text",
        "Social Media",
        "Web",
        "Games"
      ],
      imgs: [
        'text.png',
        'social.png',
        'web.png',
        'games.png',
      ],
    },
    {
      question: "What do teachers fear the most?",
      category: "NONE",
      cr: 3,
      answers: [
        "SnapChat",
        "Instagram",
        "Yoga Pant",
        "Phone"
      ],
      imgs: [
        'snapchat.png',
        'instagram.png',
        'yoga.png',
        'phone.png',
      ],

    },
    {
      question: "What is the teacher's greatest challenge in a classroom?",
      category: "NONE",
      cr: 0,
      answers: [
        "Interaction",
        "Budget",
        "Class Size",
        "Tests"
      ],
      imgs: [
        'interaction.png',
        'budget.png',
        'class.jpg',
        'tests.png',
      ],
    },
    {
      question: "What other tools have been used that haven’t worked?",
      category: "NONE",
      cr: 4,
      answers: [
        "Chromebook",
        "Smartboard",
        "Pencil",
        "Clicker",
        "Phone"
      ],
      imgs: [
        'chromebook.png',
        'smartboard.png',
        'pencil.png',
        'clicker.png',
        'phone.png',
      ],
    }
  ];

  var students = [
    {
      id: 'mu',
      icon: 'img/',
      question: 'When was WWI started?',
      value: 1,
      score: 0
    }, {
      id: 'rm',
      icon: 'img/',
      question: 'What is the capital of Oregon?',
      value: 2,
      score: 0
    },
    {
      id: 'se',
      icon: 'img/',
      question: 'How old is Obama?',
      value: 2,
      score: 0
    },
    {
      id: 'xd',
      icon: 'img/',
      question: 'None of the above',
      value: 2,
      score: 0
    }
  ];

  return {
    getQuestions: function () {
      return questions;
    },
    getStudents: function () {
      return students;
    }
  };
}
