export interface JobAdmin {
  id: string;
  logo: string;
  work: string;
  company: string;
  request: string;
  email: string;
  phone: string;
  link: string;
  country: string[];
  isActive?: boolean;
}
