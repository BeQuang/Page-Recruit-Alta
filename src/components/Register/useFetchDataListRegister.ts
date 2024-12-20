// useFetchDataListRegister.ts
import { useEffect } from "react";
import {
  fetchAllApplyPosition,
  fetchAllImplementationForm,
  fetchAllRegistrationForm,
  fetchAllWhereKnown,
} from "../../firebase/listDropdownController";

const useFetchDataListRegister = ({
  setApplyPositions,
  setRegistrationForms,
  setImplementationForms,
  setWhereKnowns,
}: any) => {
  useEffect(() => {
    const fetchApplyPositions = async () => {
      try {
        const data = await fetchAllApplyPosition();
        setApplyPositions(data);
      } catch (error) {
        console.error("Error fetching apply positions:", error);
      }
    };

    const fetchRegistrationForms = async () => {
      try {
        const data = await fetchAllRegistrationForm();
        setRegistrationForms(data);
      } catch (error) {
        console.error("Error fetching registration forms:", error);
      }
    };

    const fetchImplementationForms = async () => {
      try {
        const data = await fetchAllImplementationForm();
        setImplementationForms(data);
      } catch (error) {
        console.error("Error fetching implementation forms:", error);
      }
    };

    const fetchWhereKnowns = async () => {
      try {
        const data = await fetchAllWhereKnown();
        setWhereKnowns(data);
      } catch (error) {
        console.error("Error fetching where knowns:", error);
      }
    };

    fetchApplyPositions();
    fetchRegistrationForms();
    fetchImplementationForms();
    fetchWhereKnowns();
  }, [
    setApplyPositions,
    setRegistrationForms,
    setImplementationForms,
    setWhereKnowns,
  ]);

  return null;
};

export default useFetchDataListRegister;
