const buildMakeRoom = ({ sanitize }) => {
  const makeRoom = ({ title, admins, members, messages }) => {
    console.log("Entity: makeRoom called.");

    if (!title) {
      throw new Error('"Title" for the room must be provided.');
    }

    if (!admins || admins.length < 1) {
      throw new Error('"Admins" for the room must be provided.');
    }

    if (!members || members.length < 1) {
      throw new Error('"Members" for the room must be provided.');
    }

    messages = messages || [];

    // title = sanitize(title);

    return Object.freeze({
      getTitle: () => title,
      getAdmins: () => admins,
      getMembers: () => members,
      getMessages: () => messages,
      addMessage: (message) => {
        messages = [...messages, message];
      },
      makeObject: () => {
        return { title, admins, members, messages };
      },
    });
  };
  return makeRoom;
};

export default buildMakeRoom;
