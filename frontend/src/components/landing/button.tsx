import But from "./button/but";
const button = () => {
  return (
    <div className="flex justify-center mt-5 space-x-4">
      <But text={"Sign Up"}/>
      <button className="p-1.5 px-4 text-sm border-2 border-black rounded-md">
        {" "}
        Learn More
      </button>
    </div>
  );
};

export default button;
