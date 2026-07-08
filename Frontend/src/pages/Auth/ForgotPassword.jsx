const ForgotPassword = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
        Send OTP
      </button>
    </div>
  );
};

export default ForgotPassword;