import makeLogin from "../../login";
const makeLoginUser = ({ callLogin }) => {
  const loginUser = async ({ username, password }) => {
    console.log("USECASE: loginUser called.");

    const login = makeLogin({ username, password });
    const loginObject = login.makeObject();
    const apiResponse = await callLogin({
      username: loginObject.username,
      password: loginObject.safePassword,
    });
    console.log("API RESPONSE: ", apiResponse);
    if (!apiResponse.success) {
      return {
        ok: false,
        alert: "Login is unsuccessfull",
      };
    }
    return {
      ok: true,
      info: { ...apiResponse },
      alert: "Login Successfully.",
    };
  };
  return loginUser;
};

export default makeLoginUser;
