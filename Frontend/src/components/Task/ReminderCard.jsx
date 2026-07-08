const ReminderCard = ({ reminder }) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow p-5">
      <h2 className="font-semibold">
        {reminder.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {reminder.time}
      </p>
    </div>
  );
};

export default ReminderCard;