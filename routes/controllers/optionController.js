import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option: [validasaur.required, validasaur.minLength(1)],
  };
  
  const optionData = async (request) => {
      const body = request.body({ type: "form" });
      const params = await body.value;
      return {
          option: params.get("option_text"),
          correct: params.get("is_correct"),
      };
  };

  const addOption = async ({params, request, response, render, user }) => {
    const oData = await optionData(request);
  
    const [passes, errors] = await validasaur.validate(
      oData,
      optionValidationRules,
    );
  
    if (!passes) {
      console.log(errors);
      oData.validationErrors = errors;
      render("question.eta", { question: await questionService.showQuestion(params.qId), options: await optionService.listOptions(params.qId), validationErrors: oData.validationErrors, topicId: params.id, questionId: params.qId});
    } else {
      if (oData.correct === null) {
      await optionService.addOption(
        params.qId,
        oData.option,
        false
      );
      } else {
        await optionService.addOption(
        params.qId,
        oData.option,
        true
      );
      }
  
      response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
  };

const deleteOption = async ({params, response}) => {
  await optionService.removeOption(params.oId);

  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
}

export {addOption, deleteOption}