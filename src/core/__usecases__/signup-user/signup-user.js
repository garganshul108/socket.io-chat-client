import makeSignup from "../../signup";
const makeSignupUser = ({ callSignup }) => {
  const signupUser = async ({ username, password, confirmPassword }) => {
    console.log("USECASE: signupUser called.");

    const signup = makeSignup({ username, password, confirmPassword });
    const signupObj = signup.makeObject();
    const apiResponse = await callSignup({
      username: signupObj.username,
      password: signupObj.safePassword,
    });
    console.log("API RESPONSE: ", apiResponse);
    if (!apiResponse.success) {
      return {
        ok: false,
        alert: "Signup is unsuccessfull",
      };
    }
    return {
      ok: true,
      info: { ...apiResponse },
      alert: "Signup Successfully.",
    };
  };
  return signupUser;
};

export default makeSignupUser;
