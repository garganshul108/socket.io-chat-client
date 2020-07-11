const makeCallPostRoom = ({ ENDPOINT, httpService }) => {
  const callPostRoom = async ({ admin, title }) => {
    console.log("APICALL: callPostRoom called.");

    // const res = await httpService.post(ENDPOINT, { admin, title });
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
    const { data } = await httpService.post(ENDPOINT, { admin, title });
    return {
      success: true,
      ...data,
    };
  };
  return callPostRoom;
};

export default makeCallPostRoom;
