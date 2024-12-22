import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./userController";

const contestsCollection = collection(firestore, "contest");
const internshipGroupCollection = collection(firestore, "internship-group");
const applyPositionCollection = collection(firestore, "apply-position");
const registrationFormCollection = collection(firestore, "registration-form");
const implementationFormCollection = collection(
  firestore,
  "implementation-form"
);
const whereKnownCollection = collection(firestore, "where-known");
const areasExpertiseCollection = collection(firestore, "areas-expertise");
const companyCollection = collection(firestore, "company");

export const fetchAllTitles = async (): Promise<
  { title: string; fullTime: number }[]
> => {
  try {
    const querySnapshot = await getDocs(contestsCollection);
    const contests = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          title: data?.title,
          fullTime: data?.fullTime, // Lấy thêm fullTime từ mỗi contest
          timeCurrent: 0,
        };
      })
      .filter(
        (contest) =>
          contest.title !== undefined && contest.fullTime !== undefined
      ); // Lọc những contest không có title hoặc fullTime

    return contests;
  } catch (error) {
    console.error("Error fetching titles:", error);
    throw error;
  }
};

export const fetchAllInternshipGroup = async () => {
  try {
    const querySnapshot = await getDocs(internshipGroupCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllApplyPosition = async () => {
  try {
    const querySnapshot = await getDocs(applyPositionCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllRegistrationForm = async () => {
  try {
    const querySnapshot = await getDocs(registrationFormCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllImplementationForm = async () => {
  try {
    const querySnapshot = await getDocs(implementationFormCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllWhereKnown = async () => {
  try {
    const querySnapshot = await getDocs(whereKnownCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllAreasExpertise = async () => {
  try {
    const querySnapshot = await getDocs(areasExpertiseCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

export const fetchAllCompany = async () => {
  try {
    const querySnapshot = await getDocs(companyCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};
