import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const showRandomQuestion = async ({response}) => {
    const randQuestion = await questionService.randomQuestion();

    if (randQuestion != null) {
    const options = await optionService.listOptions(randQuestion.id);
    for (let i = 0; i < options.length; i++) {
        delete options[i].question_id;
        delete options[i].is_correct;
      }
    response.body = {
        questionId: randQuestion.id,
        questionText: randQuestion.question_text,
        answerOptions: options,
    };
    } else {
    response.body = {}
    }
};

const tellAnswer = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const content = await body.value;
    const answer = await optionService.correctOrNot(content.optionId)
    response.body = { 
        correct: answer
    }
    
}

export { showRandomQuestion, tellAnswer };