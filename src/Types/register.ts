export interface FormDataRegisterOnline {
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
  selectedFile: File | null; // Trường file sẽ không được lưu
}

export interface FirestoreDataRegisterOnline {
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
  selectedFileURL: string | null; // Trường chứa URL của file từ Cloudinary
  createdAt: Date;
}

export interface FirestoreDataRegisterBusiness {
  email: string;
  address: string;
  business: string;
  manager: string;
  phone: string;
  phoneManager: string;
  createdAt: Date;
}
