const CalendarView = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        Calendar
      </h2>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(31)].map((_, index) => (
          <div
            key={index}
            className="border p-3 rounded text-center hover:bg-blue-100"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;