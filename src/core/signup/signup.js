const buildMakeSignup = ({ hashPassword, santizeText }) => {
  const makeSignup = ({ username, password, confirmPassword }) => {
    console.log("Entity: makeSignup called.");

    if (!username || !password || !confirmPassword) {
      throw new Error("Insufficent information.");
    }

    if (confirmPassword !== password) {
      throw new Error("Passwords donot match.");
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
  return makeSignup;
};

export default buildMakeSignup;
