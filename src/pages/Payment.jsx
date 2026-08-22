import { useParams, useNavigate, Navigate } from "react-router-dom";
import courseData from "../data/courseData";

export default function Payment() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) return <Navigate to="/login" />;

  const course = courseData.find((c) => c.id === courseId);

  if (!course) return <div>Course not found</div>;

  /* ---------- ENROLL USER ---------- */

  const enrollUser = async () => {

    await fetch("https://lms-xy4t.onrender.com/api/enrollments/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: user.email,
        courseId: courseId
      })
    });

  };


  /* ---------- SAVE PAYMENT ---------- */

  const savePayment = async () => {

    await fetch("https://lms-xy4t.onrender.com/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: user.email,
        courseId: courseId,
        amount: course.price
      })
    });

  };


  /* ---------- OTP FLOW ---------- */

  const showOtpScreen = () => {

    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("otpSection").style.display = "block";

    const otp = Math.floor(100000 + Math.random() * 900000);

    window.generatedOtp = otp;

    alert("OTP sent to mobile (Demo OTP: " + otp + ")");

  };


  /* ---------- VERIFY OTP ---------- */

  const verifyOtp = async () => {

    const entered = document.getElementById("otpInput").value;

    if (Number(entered) === window.generatedOtp) {

      await savePayment();   // 💰 SAVE PAYMENT
      await enrollUser();    // 📚 ENROLL COURSE

      alert("Payment Successful!");

      navigate(`/learn/${courseId}`);

    } else {

      alert("Invalid OTP");

    }

  };


  return (

    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

      <div className="w-[950px] bg-white rounded-xl shadow-2xl flex overflow-hidden">

        {/* LEFT PANEL */}

        <div className="w-[30%] bg-[#161616] text-white p-6">

          <h2 className="text-xl font-bold mb-6">SkillWave</h2>

          <div className="mt-10 border-t border-gray-600 pt-4">

            <p className="text-sm opacity-70">Amount</p>

            <h1 className="text-2xl font-bold">₹ {course.price}</h1>

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="w-[70%] p-8 relative">

          {/* PAYMENT */}

          <div id="paymentSection">

            <h3 className="text-lg font-semibold mb-4">Card Details</h3>

            <input
              className="w-full border border-gray-300 p-3 rounded-md mb-3"
              defaultValue="4111 1111 1111 1111"
            />

            <div className="flex gap-4">

              <input
                className="w-1/2 border border-gray-300 p-3 rounded-md"
                defaultValue="12/29"
              />

              <input
                className="w-1/2 border border-gray-300 p-3 rounded-md"
                defaultValue="123"
              />

            </div>

            <button
              onClick={showOtpScreen}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold mt-8"
            >
              Continue to Pay ₹{course.price}
            </button>

          </div>


          {/* OTP */}

          <div id="otpSection" style={{ display: "none" }}>

            <h3 className="text-lg font-semibold mb-4">OTP Verification</h3>

            <input
              id="otpInput"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold"
            >
              Verify OTP
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}