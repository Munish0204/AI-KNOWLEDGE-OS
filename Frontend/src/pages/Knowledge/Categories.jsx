const Categories = () => {
  const categories = [
    "Programming",
    "AI",
    "Cyber Security",
    "Database",
    "Cloud Computing",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-indigo-100 text-center rounded-lg p-6 font-semibold"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;