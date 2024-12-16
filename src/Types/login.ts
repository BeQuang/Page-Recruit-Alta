export interface Option {
  text: string;
}

export interface User {
  email: string;
  password: string;
  option?: string | null;
  remember?: boolean;
  captcha?: boolean;
}
