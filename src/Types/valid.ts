export interface ValidLoginProps {
  email?: string | null;
  password?: string | null;
}

export interface ValidProcessProps {
  type?: string | null;
  link?: string | null;
  description?: string | null;
}

export interface validRegisterBusinessProps {
  email?: string | null;
  address?: string | null;
  business?: string | null;
  manager?: string | null;
  phone?: string | null;
  phoneManager?: string | null;
}

export interface validRegisterOnlineProps {
  name: string;
  school: string;
  specialized: string;
  email: string;
  phone: string;
  location: string;
  shape: string;
  implement: string;
  known: string;
  selectedDate: Date | null;
  selectedFile: File | null;
}
