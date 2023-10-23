const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="classting.png"
        alt="classting"
        className="animate-spin w-16 h-16 mb-2"
      />
      <p className="text-xl font-semibold">문제를 불러오고 있습니다...</p>
    </div>
  );
};

export default Loading;
