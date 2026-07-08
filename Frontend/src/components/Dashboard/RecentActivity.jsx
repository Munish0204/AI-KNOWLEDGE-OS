const activities = [
  "Uploaded Project Report.pdf",
  "Generated AI Summary",
  "Added New Note",
  "Completed Task",
  "Voice Recording Saved",
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="border-b pb-2 last:border-none"
          >
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;