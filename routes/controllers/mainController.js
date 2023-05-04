import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const showMain = async ({ render }) => {
  const tcount = await topicService.numOfTopics()
  const tcount2 = tcount.count
  const qcount = await questionService.numOfQuestions()
  const qcount2 = qcount.count
  const acount = await questionService.numOfAnswers()
  const acount2 = acount.count

  render("main.eta", {topics: tcount2, questions: qcount2, answers: acount2});
};

export { showMain };
