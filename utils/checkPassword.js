export const validatePassword = password => {
  if (password.split(' ').length < 0 || password.length < 6) {
    return false;
  }
  return true;
};

// || !password.match(/[^a-zA-Z0-9]/g)
