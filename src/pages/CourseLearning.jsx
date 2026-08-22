import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import courseData from "../data/courseData";

export default function CourseLearning() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const course = courseData.find(
    (c) => String(c.id) === String(courseId)
  );

  const [certStatus, setCertStatus] = useState(null);

  /* ---------- AI CHAT STATES ---------- */

  const [aiMessage, setAiMessage] = useState("");
  const [aiChat, setAiChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  /* ---------- CHECK CERTIFICATE STATUS ---------- */

  useEffect(() => {

    const checkCertificate = async () => {

      if (!user) return;

      try {

        const res = await fetch(
          `https://lms-xy4t.onrender.com/api/certificates/user/${user.email}`
        );

        const data = await res.json();

        const cert = data.find(
          (c) => String(c.courseId) === String(courseId)
        );

        if (cert) {
          setCertStatus(cert.status);
        }

      } catch (err) {

        console.error("Certificate fetch error:", err);

      }

    };

    checkCertificate();

  }, [courseId, user]);

  /* ---------- AUTH CHECK ---------- */

  if (!user) return <Navigate to="/login" />;

  if (!course || !course.units || course.units.length === 0) {
    return <div className="p-10">Course data not available</div>;
  }

  /* ---------- CURRENT LESSON ---------- */

  let currentLesson =
    JSON.parse(localStorage.getItem("currentLesson")) ||
    course.units[0]?.lessons?.[0];

  if (!currentLesson) {
    return <div className="p-10">Lesson not found</div>;
  }

  /* ---------- QUIZ STATUS ---------- */

  const quizCompleted =
    localStorage.getItem(`quizCompleted_${courseId}`) === "true";

  /* ---------- FUNCTIONS ---------- */

  const changeLesson = (lesson) => {
    localStorage.setItem("currentLesson", JSON.stringify(lesson));
    window.location.reload();
  };

  const downloadNotes = () => {

    const doc = new jsPDF();

    doc.text(currentLesson.title || "Notes", 10, 15);

    doc.text(currentLesson.notes || "No notes available", 10, 30, {
      maxWidth: 180,
    });

    doc.save("notes.pdf");

  };

  const goToQuiz = () => {

    const unit = course.units.find((u) =>
      u.lessons?.some((l) => l.id === currentLesson.id)
    );

    if (unit) {
      navigate(`/quiz/${courseId}/${unit.id}`);
    } else {
      alert("Quiz not available");
    }

  };

  /* ---------- REQUEST CERTIFICATE ---------- */

  const requestCertificate = async () => {

    try {

      await fetch("https://lms-xy4t.onrender.com/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          courseId: courseId,
        }),
      });

      setCertStatus("pending");

    } catch (err) {

      console.error("Certificate request error:", err);

    }

  };

  /* ---------- AI CHAT FUNCTION ---------- */

  const sendAiMessage = async () => {

    if (!aiMessage.trim()) return;

    const newChat = [...aiChat, { role: "user", text: aiMessage }];
    setAiChat(newChat);
    setAiLoading(true);

    try {

      const res = await fetch("https://lms-xy4t.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: aiMessage,
          courseTitle: course.title,
          chatHistory: newChat
        })
      });

      const data = await res.json();

      setAiChat([
        ...newChat,
        { role: "ai", text: data.reply }
      ]);

      setAiMessage("");

    } catch (error) {

      console.error("AI error:", error);

    }

    setAiLoading(false);

  };

  /* ---------- VIDEO ---------- */

  const videoId =
    currentLesson.videoUrl?.split("v=")[1] || "";

  /* ---------- UI ---------- */

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}

      <aside className="w-72 bg-white border-r p-4 overflow-y-auto">

        <h2 className="font-bold mb-4">{course.title}</h2>

        {course.units.map((unit) => (

          <div key={unit.id} className="mb-4">

            <div className="font-semibold text-sm mb-2">
              {unit.unitTitle}
            </div>

            {unit.lessons?.map((lesson) => (

              <div
                key={lesson.id}
                onClick={() => changeLesson(lesson)}
                className={`p-2 text-sm cursor-pointer rounded mb-1 transition ${
                  lesson.id === currentLesson.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                {lesson.title}
              </div>

            ))}

          </div>

        ))}

      </aside>

      {/* Main */}

      <main className="flex-1 p-6 overflow-y-auto">

        {/* Video */}

        {videoId ? (
          <iframe
            className="w-full h-[380px] mb-4 rounded shadow"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="lesson"
            allowFullScreen
          />
        ) : (
          <div className="bg-black text-white p-10 mb-4 rounded">
            Video not available
          </div>
        )}

        <h1 className="text-xl font-bold mb-2">
          {currentLesson.title}
        </h1>

        {/* Notes */}

        <div className="bg-white p-4 rounded shadow mb-6">

          <div className="flex justify-between mb-2">

            <b>Lesson Notes</b>

            <button
              onClick={downloadNotes}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Download PDF
            </button>

          </div>

          <div className="whitespace-pre-line">
            {currentLesson.notes || "No notes available"}
          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-4 items-center">

          {!quizCompleted ? (

            <button
              onClick={goToQuiz}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Take Quiz
            </button>

          ) : (

            <div className="flex gap-4 items-center">

              {!certStatus && (

                <button
                  onClick={requestCertificate}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
                >
                  🎓 Request Certificate
                </button>

              )}

              {certStatus === "pending" && (

                <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg border border-yellow-400 animate-pulse">
                  ⏳ Certificate Requested
                </div>

              )}

              {certStatus === "approved" && (

                <button
                  onClick={() => navigate(`/certificate/${courseId}`)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
                >
                  🏆 Download Certificate
                </button>

              )}

            </div>

          )}

        </div>

        {/* ---------------- AI CHATBOT ---------------- */}

        <div className="mt-10 bg-white rounded shadow p-4">

          <h2 className="font-bold text-lg mb-3">
            🤖 SkillWave AI Learning Assistant
          </h2>

          <div className="h-60 overflow-y-auto border p-3 mb-3 bg-gray-50 rounded">

            {aiChat.map((msg, index) => (

              <div key={index} className="mb-2">

                {msg.role === "user" && (
                  <div className="text-right">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded inline-block">
                      {msg.text}
                    </span>
                  </div>
                )}

                {msg.role === "ai" && (
                  <div className="text-left">
                    <span className="bg-gray-200 px-3 py-1 rounded inline-block">
                      {msg.text}
                    </span>
                  </div>
                )}

              </div>

            ))}

            {aiLoading && <div>AI is thinking...</div>}

          </div>

          <div className="flex gap-2">

            <input
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask AI about this lesson..."
              className="flex-1 border px-3 py-2 rounded"
            />

            <button
              onClick={sendAiMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}