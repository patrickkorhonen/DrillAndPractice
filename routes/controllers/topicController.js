import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
  };

const topicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};

const add = async ({ request, response, render, user }) => {
    const tData = await topicData(request);
  
    const [passes, errors] = await validasaur.validate(
      tData,
      topicValidationRules,
    );
  
    if (!passes) {
      tData.validationErrors = errors;
      render("topics.eta", { topics: await topicService.listTopics(), validationErrors: tData.validationErrors });
    } else {
      await topicService.addTopic(
        user.id,
        tData.name,
      );
  
      response.redirect("/topics");
    }
  };

const list = async ({ render, user }) => {
    render("topics.eta", { topics: await topicService.listTopics(), isAdmin: user.admin});
  };

const deleteTopic = async ({params, response}) => {
    await topicService.deleteTopic(params.id);

    response.redirect("/topics");
}

export {list, add, deleteTopic}