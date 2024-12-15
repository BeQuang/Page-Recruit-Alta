// HandleUseEffectContest.tsx
import { useEffect } from "react";
import { DataContest, ResultSubmit } from "../../Types/contest";
import { fetchContestByTitle } from "../../firebase/contestController";

// Hàm để xử lý fetching data contest
export const useFetchContestData = (
  title: string | undefined,
  setDataContest: React.Dispatch<React.SetStateAction<DataContest | null>>,
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResultSubmit: React.Dispatch<React.SetStateAction<ResultSubmit>>
) => {
  useEffect(() => {
    const fetchData = async () => {
      if (!title) {
        console.error("No title provided");
        return;
      }

      try {
        const contestData = await fetchContestByTitle(title);
        setDataContest(contestData);
        setRemainingTime(contestData.fullTime);
        setLoading(false);
        setResultSubmit({ id: contestData.id, result: [], submitted: false });
      } catch (error) {
        console.error("Error fetching contest:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [title, setDataContest, setRemainingTime, setLoading, setResultSubmit]);
};

// Hàm để xử lý giảm thời gian còn lại
export const useCountdown = (
  remainingTime: number,
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, setRemainingTime]);
};

// Hàm để xử lý việc nộp kết quả khi hết thời gian
export const useSubmitOnTimeUp = (
  remainingTime: number,
  resultSubmit: ResultSubmit,
  handleSubmitResult: () => void
) => {
  useEffect(() => {
    if (remainingTime <= 0 && !resultSubmit.submitted) {
      handleSubmitResult();
    }
  }, [remainingTime, resultSubmit.submitted, handleSubmitResult]);
};

// Hàm để xử lý số câu hỏi đã hoàn thành
export const useCompletedQuestions = (
  resultSubmit: ResultSubmit,
  setCompletedQuestions: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    let completedCount = 0;

    resultSubmit.result.forEach((result) => {
      const isCompleted =
        (result.oneAnswer && result.oneAnswer.trim() !== "") ||
        (result.multipleAnswer && result.multipleAnswer.length > 0) ||
        (result.textAnswer && result.textAnswer.trim() !== "");

      if (isCompleted) {
        completedCount++;
      }
    });

    setCompletedQuestions(completedCount);
  }, [resultSubmit, setCompletedQuestions]);
};

// Hàm để xử lý cảnh báo trước khi rời trang
export const useBeforeUnloadWarning = (
  remainingTime: number,
  completedQuestions: number,
  dataContest: DataContest | null,
  resultSubmit: ResultSubmit
) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (
        remainingTime > 0 &&
        completedQuestions !== dataContest?.totalQuestions &&
        !resultSubmit.submitted
      ) {
        const message =
          "Bạn còn thời gian làm bài, bạn có chắc chắn muốn rời khỏi?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [remainingTime, completedQuestions, dataContest, resultSubmit]);
};

// Hàm để xử lý việc chặn điều hướng
export const useBlockNavigation = (
  remainingTime: number,
  completedQuestions: number,
  dataContest: DataContest | null,
  resultSubmit: ResultSubmit,
  setIsNavigationBlocked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (
      remainingTime <= 0 ||
      completedQuestions === dataContest?.totalQuestions ||
      resultSubmit.submitted
    ) {
      setIsNavigationBlocked(false);
    } else {
      setIsNavigationBlocked(true);
    }
  }, [
    remainingTime,
    completedQuestions,
    dataContest,
    resultSubmit,
    setIsNavigationBlocked,
  ]);
};
