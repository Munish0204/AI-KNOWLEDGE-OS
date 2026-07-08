const VerifyOTP = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button className="w-full bg-purple-600 text-white p-3 rounded-lg">
        Verify OTP
      </button>
    </div>
  );
};

export default VerifyOTP;