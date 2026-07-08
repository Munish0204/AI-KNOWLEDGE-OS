const Settings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <label className="block mb-4">
        <input type="checkbox" className="mr-2" />
        Enable Notifications
      </label>

      <label className="block">
        <input type="checkbox" className="mr-2" />
        Dark Mode
      </label>
    </div>
  );
};

export default Settings;