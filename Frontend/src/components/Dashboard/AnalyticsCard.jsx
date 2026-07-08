const AnalyticsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="text-4xl">
        {icon}
      </div>
    </div>
  );
};

export default AnalyticsCard;