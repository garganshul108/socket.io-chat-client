const makeCallLogin = ({ ENDPOINT, httpService }) => {
  const callLogin = async ({ username, password }) => {
    console.log("APICALL: callLogin called.");
    try {
      const { data } = await httpService.post(ENDPOINT, { username, password });
      return {
        success: true,
        ...data,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  return callLogin;
};

export default makeCallLogin;
