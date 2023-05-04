import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question: [validasaur.required, validasaur.minLength(1)],
  };

const questionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
      question: params.get("question_text"),
  };
};

const add = async ({params, request, response, render, user }) => {
    const qData = await questionData(request);
  
    const [passes, errors] = await validasaur.validate(
      qData,
      questionValidationRules,
    );
  
    if (!passes) {
      qData.validationErrors = errors;
      render("questions.eta", { questions: await questionService.listQuestions(params.id), validationErrors: qData.validationErrors, topicId: params.id});
    } else {
      await questionService.addQuestion(
        user.id,
        params.id,
        qData.question,
      );
  
      response.redirect(`/topics/${params.id}`);
    }
  };

const list = async ({ render, params }) => {
    render("questions.eta", { questions: await questionService.listQuestions(params.id), topicId: params.id });
  };


const showQuestion = async ({ render, params }) => {
render("question.eta", { question: await questionService.showQuestion(params.qId), options: await optionService.listOptions(params.qId), topicId: params.id, questionId: params.qId });
};

const deleteQuestion = async ({params, response}) => {
  await questionService.deleteQuestion(params.qId);

  response.redirect(`/topics/${params.tId}`);
}


export {list, add, showQuestion, deleteQuestion}