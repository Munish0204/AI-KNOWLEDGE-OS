const ResetPassword = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button className="w-full bg-green-600 text-white p-3 rounded-lg">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;