interface ValidLoginProps {
  email?: string | null;
  password?: string | null;
}

const validLogin = async ({ email, password }: ValidLoginProps) => {
  if (email === "" || password === "") {
    return false;
  }
  return true;
};

export { validLogin };
