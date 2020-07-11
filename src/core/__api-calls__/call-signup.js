const makeCallSignup = ({ ENDPOINT, httpService }) => {
  const callSignup = async ({ username, password }) => {
    console.log("APICALL: callSignup called.");

    // const res = await httpService.post(ENDPOINT, { username, password });
    // if (res.status >= 200 && res.status < 300) {
    //   return {
    //     success: true,
    //     ...res,
    //   };
    // } else {
    //   return {
    //     success: false,
    //     ...res,
    //   };
    // }
    // try {
    const { data } = await httpService.post(ENDPOINT, { username, password });
    return {
      success: true,
      ...data,
    };
    // } catch (err) {
    //   return {
    //     success: false,
    //   };
    // }
  };
  return callSignup;
};

export default makeCallSignup;
