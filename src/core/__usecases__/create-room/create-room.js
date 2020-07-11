import makeRoom from "../../room";

const makeCreateRoom = ({ callPostRoom }) => {
  const createRoom = async ({ title, admin }) => {
    console.log("USECASE: createRoom called.");

    const room = makeRoom({
      title,
      admins: [admin],
      members: [admin],
      messages: [],
    });

    const apiResponse = await callPostRoom({ title, admin });

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
  return createRoom;
};
export default makeCreateRoom;
