const buildMakeLogin = ({ hashPassword, santizeText }) => {
  const makeLogin = ({ username, password }) => {
    console.log("Entity: makeLogin called.");

    if (!username || !password) {
      throw new Error("Username and Password must be provided.");
    }

    username = santizeText(username);
    const safePassword = hashPassword(password);

    return Object.freeze({
      getUsername: () => username,
      getSafePassword: () => safePassword,
      makeObject: () => {
        return { username, safePassword };
      },
    });
  };
  return makeLogin;
};

export default buildMakeLogin;
