import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import courseData from "../data/courseData";

export default function Certificate() {

  const { courseId } = useParams();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const course = courseData.find(
    (c) => String(c.id) === String(courseId)
  );

  const certificateId =
    "SW-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  /* Save certificate to database */

  useEffect(() => {

    if (!user || !course) return;

    fetch("https://lms-xy4t.onrender.com/api/certificates/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: user.email,
        userName: user.name,
        courseId: course.id,
        courseTitle: course.title,
        certificateId: certificateId
      })
    })
      .then(res => res.json())
      .then(data => console.log("Certificate saved:", data))
      .catch(err => console.error("Certificate save error:", err));

  }, [user, course, certificateId]);

  if (!user) return <Navigate to="/login" />;

  if (!course) return <div className="p-10">Course not found</div>;

  /* Download PDF */

  const downloadCertificate = async () => {

    const element = document.getElementById("certificate");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

    pdf.save("SkillWave-Certificate.pdf");

  };

  return (

    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">

      {/* Certificate */}

      <div
        id="certificate"
        className="w-[950px] h-[550px] bg-[#0f0f0f] text-white relative shadow-2xl rounded-lg overflow-hidden border-[6px] border-[#c9a46a]"
      >

        {/* Header */}

        <div className="text-center mt-10">

          <h1 className="text-4xl font-bold tracking-widest text-[#c9a46a]">
            SKILLWAVE
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Learning Management System
          </p>

        </div>

        {/* Title */}

        <div className="text-center mt-12">

          <h2 className="text-3xl font-semibold">
            Certificate of Completion
          </h2>

          <p className="text-gray-400 mt-3">
            This is to certify that
          </p>

          <h3 className="text-4xl font-bold text-[#c9a46a] mt-4">
            {user.name}
          </h3>

          <p className="text-gray-400 mt-4">
            has successfully completed the course
          </p>

          <h3 className="text-2xl font-semibold mt-3">
            {course.title}
          </h3>

        </div>

        {/* Footer */}

        <div className="absolute bottom-10 w-full px-20 flex justify-between items-center">

          {/* SkillWave Seal */}

          <div className="text-center">

            <div className="w-28 h-28 rounded-full border-4 border-[#c9a46a] flex items-center justify-center bg-[#111] shadow-lg">

              <div className="text-center">

                <p className="text-[#c9a46a] text-sm font-bold tracking-wide">
                  SKILLWAVE
                </p>

                <p className="text-xs text-gray-400">
                  OFFICIAL
                </p>

                <p className="text-xs text-gray-400">
                  SEAL
                </p>

              </div>

            </div>

          </div>

          {/* Certificate ID */}

          <div className="text-center">

            <p className="text-sm text-gray-400">
              Certificate ID
            </p>

            <p className="font-mono text-[#c9a46a]">
              {certificateId}
            </p>

          </div>

          {/* Issue Date */}

          <div className="text-center">

            <div className="border-b border-gray-500 w-40 mb-1"></div>

            <p className="text-sm text-gray-400">
              Issued on
            </p>

            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

      {/* Download Button */}

      <button
        onClick={downloadCertificate}
        className="mt-6 bg-[#c9a46a] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Download Certificate
      </button>

    </div>

  );

}