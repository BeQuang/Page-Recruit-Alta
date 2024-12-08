interface ValidLoginProps {
  email?: string | null;
  password?: string | null;
}

const validLogin = ({ email, password }: ValidLoginProps) => {
  if (email !== "admin" || password !== "1") {
    return false;
  } else return true;
};

export { validLogin };
