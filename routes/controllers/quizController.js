import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const list = async ({ render }) => {
    render("quizTopics.eta", { topics: await topicService.listTopics() });
  };

const randomQuestion = async ({ params, response }) => {
    const questions = await questionService.listQuestions(params.tId);
    const questionIds = []
    for (let i = 0; i < questions.length; i++) {
        questionIds.push(questions[i].id)
    }
    if (questionIds.length === 0) {
        response.redirect(`/quiz/${params.tId}/questions/0`);
    } else {
        const randomId = questionIds[Math.floor(Math.random()*questionIds.length)];
        response.redirect(`/quiz/${params.tId}/questions/${randomId}`);
    }  
};

const showRandomQuestion = async ({ render, params }) => {
    if (params.qId === 0) {
        render("quizQuestion.eta")
    } else {
    render("quizQuestion.eta", { topicId: params.tId, question: await questionService.showQuestion(params.qId), options: await optionService.listOptions(params.qId)});
}
}

const checkAnswer = async ({ response, params, user}) => {
    const answerOption =  await optionService.correctOrNot(params.oId)
    const answer = answerOption.is_correct
    await questionService.storeAnswer(user.id, params.qId, params.oId);
    if (answer) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
}

const correctAnswer = async ({ render, params }) => {
    render("correct.eta", {topicId: params.tId});
  };

  const incorrectAnswer = async ({ render, params }) => {
    const answer = await optionService.answer(params.qId);
    if (answer != null) {
        render("incorrect.eta", {topicId: params.tId, answer: answer.option_text});
    } else {
        render("incorrect.eta", {topicId: params.tId});
    }
  };

export {list, randomQuestion, showRandomQuestion, checkAnswer, correctAnswer, incorrectAnswer}