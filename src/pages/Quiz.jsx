import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../data/quizData";

export default function Quiz() {
  const { courseId, unitId } = useParams();
  const navigate = useNavigate();

  const questions = quizData[courseId]?.[unitId] || [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  /* TIMER */
  useEffect(() => {
    if (submitted) return;

    if (timeLeft === 0) {
      setSubmitted(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  const handleSelect = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const score = questions.reduce((total, q, i) => {
    return total + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 60;

  const submitQuiz = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Answer all questions");
      return;
    }

    setSubmitted(true);

    if (passed) {
      const quizPassed =
        JSON.parse(localStorage.getItem("quizPassed")) || {};
      quizPassed[courseId] = true;
      localStorage.setItem("quizPassed", JSON.stringify(quizPassed));

      /* ADD THIS LINE */
      localStorage.setItem(`quizCompleted_${courseId}`, "true");
    }
  };

  if (!questions.length) {
    return <div className="p-10">No quiz available.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Final Quiz</h2>
          {!submitted && (
            <span className="text-red-600 font-semibold">
              ⏱ {timeLeft}s
            </span>
          )}
        </div>

        {questions.map((q, qi) => (
          <div key={q.id} className="mb-6">

            <p className="font-semibold mb-3">
              {qi + 1}. {q.question}
            </p>

            <div className="w-full bg-gray-200 h-2 rounded mb-3">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{
                  width: `${((qi + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {q.options.map((opt, oi) => {
              const isCorrect = submitted && oi === q.answer;
              const isWrong =
                submitted && answers[qi] === oi && oi !== q.answer;

              return (
                <label
                  key={oi}
                  className={`block p-3 rounded border mb-2 cursor-pointer
                  ${isCorrect ? "bg-green-100" : ""}
                  ${isWrong ? "bg-red-100" : ""}`}
                >
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    disabled={submitted}
                    checked={answers[qi] === oi}
                    onChange={() => handleSelect(qi, oi)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        ))}

        {!submitted && (
          <button
            onClick={submitQuiz}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit Quiz
          </button>
        )}

        {submitted && (
          <div className="mt-6 bg-gray-100 p-6 rounded text-center">
            <h3 className="text-xl font-bold">
              Score: {score}/{questions.length}
            </h3>
            <p>Percentage: {percentage}%</p>

            {passed ? (
              <p className="text-green-600 font-semibold mt-2">
                ✅ Passed!
              </p>
            ) : (
              <p className="text-red-600 font-semibold mt-2">
                ❌ Failed
              </p>
            )}

            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
            >
              Back to Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
