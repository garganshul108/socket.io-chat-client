const makeSignIntoRoom = ({ callSignIntoRoom }) => {
  const signIntoRoom = async ({ roomId, userId }) => {
    console.log("USECASE: signIntoRoom called.");

    const apiResponse = await callSignIntoRoom({
      title: roomId,
      member: userId,
    });
    console.log("API RESPONSE: ", apiResponse);
    if (!apiResponse.success) {
      return {
        ok: false,
        alert: "Room failed",
      };
    }
    return {
      ok: true,
      info: { ...apiResponse },
      alert: "Successfully.",
    };
  };

  return signIntoRoom;
};

export default makeSignIntoRoom;
