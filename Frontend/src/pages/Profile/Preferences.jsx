const Preferences = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Preferences</h1>

      <div className="space-y-4">
        <label className="block">
          Language
          <select className="border rounded-lg p-2 w-full mt-2">
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
          </select>
        </label>

        <label className="block">
          Theme
          <select className="border rounded-lg p-2 w-full mt-2">
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Preferences;