
const Error = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex-col items-center gap-5 flex">
        <label className="text-red-100 text-[24px]">ERROR 404</label>
        <label>Oooops, Page does not exist</label>
      </div>
    </div>
  );
};

export default Error;
