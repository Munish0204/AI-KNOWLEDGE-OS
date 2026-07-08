const Reminder = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Reminders</h1>

      <ul className="list-disc ml-6 space-y-2">
        <li>Meeting at 10:00 AM</li>
        <li>Submit Assignment</li>
        <li>Complete Coding Practice</li>
      </ul>
    </div>
  );
};

export default Reminder;