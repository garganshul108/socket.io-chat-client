const makeCallSignIntoRoom = ({ ENDPOINT, httpService }) => {
  const callSignIntoRoom = async ({ member, title }) => {
    console.log("APICALL: callSignIntoRoom called.");

    // const res = await httpService.post(ENDPOINT, { member, title });
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
    const { data } = await httpService.post(ENDPOINT, { member, title });
    return {
      success: true,
      ...data,
    };
  };
  return callSignIntoRoom;
};

export default makeCallSignIntoRoom;
