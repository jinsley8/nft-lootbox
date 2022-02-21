export type Question = {
  questionText: string;
  image?: string;
  answers: string[];
  correctAnswerIndex?: number;
};

const quizQuestions: Question[] = [
  {
    questionText: "Which one of these Caribbean countries is not on an island?",
    image:
      "https://unsplash.com/photos/ppMxyOhPtd8/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ1NDEyNTU4&force=true&w=640",
    answers: [
      "Dominican Republic",
      "Costa Rica",
      "Jamaica",
      "Cuba",
    ],
    correctAnswerIndex: 1,
  },
  {
    questionText: "Which of these mountains is in North America?",
    image: "https://unsplash.com/photos/9wg5jCEPBsw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8fHwxNjQ1NDExMjYz&force=true&w=640",
    answers: ["Mount Everest", "Kilimanjaro", "Aconcagua", "Denali"],
    correctAnswerIndex: 3,
  },
  {
    questionText: "Which of these deserts in the hottest?",
    image:
      "https://unsplash.com/photos/L75D18aVal8/download?force=true&w=640",
    answers: ["Lut Desert", "Sahara Desert", "Mojave Desert", "Atacama Desert"],
    correctAnswerIndex: 0,
  },
  {
    questionText:
      "Which rainforest is the most biodiverse in the world?",
      image: "https://unsplash.com/photos/qLW70Aoo8BE/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ1NDEzMTkx&force=true&w=640",
    answers: ["Daintree Rainforest, Australia", "Tongass National Forest, Alaska", "Amazon Rainforest, South America", "Congo Rainforest, Africa"],
    correctAnswerIndex: 2,
  },
];

export default quizQuestions;
