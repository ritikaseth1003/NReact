const Shimmer = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {Array(20)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-40 bg-gray-300 animate-pulse rounded-lg"
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
