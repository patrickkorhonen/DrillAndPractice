import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizApi from "./apis/quizApi.js";
const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.list);
router.post("/topics", topicController.add);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.list);
router.post("/topics/:id/questions", questionController.add);
router.get("/topics/:id/questions/:qId", questionController.showQuestion)
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion)

router.post("/topics/:id/questions/:qId/options", optionController.addOption)
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption)



router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.list);
router.get("/quiz/:tId", quizController.randomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showRandomQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.checkAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectAnswer);

router.get("/api/questions/random", quizApi.showRandomQuestion);
router.post("/api/questions/answer", quizApi.tellAnswer)


export { router };
