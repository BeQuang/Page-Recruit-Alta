export interface Option {
  text: string;
}

export interface User {
  email?: string | null;
  password?: string | null;
  option?: string | null;
  remember?: boolean;
  captcha?: boolean;
}
