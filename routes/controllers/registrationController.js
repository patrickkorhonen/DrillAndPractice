import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registrationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
      email: params.get("email"),
      password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const rData = await registrationData(request);

  const [passes, errors] = await validasaur.validate(
    rData,
    registrationValidationRules,
  );

  const userFromDatabase = await userService.findUserByEmail(rData.email);
  if (userFromDatabase.length === 1) {
    render("registration.eta", { email: "", emailError: "Email already in use"});
  }
  else if (passes) {
  await userService.addUser(
    rData.email,
    await bcrypt.hash(rData.password),
  );

  response.redirect("/auth/login");
  } else {
    console.log(errors)
    rData.validationErrors = errors;
    render("registration.eta", { email: rData.email, validationErrors: rData.validationErrors });
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };