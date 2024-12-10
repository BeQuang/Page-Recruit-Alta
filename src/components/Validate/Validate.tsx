interface ValidLoginProps {
  email?: string | null;
  password?: string | null;
}

const validateEmail = (email: string | null | undefined) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validLogin = async ({ email, password }: ValidLoginProps) => {
  if (!validateEmail(email) || password === "") {
    return false;
  }
  return true;
};

export { validLogin };
