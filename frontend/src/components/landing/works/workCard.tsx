import But from "../button/but";
const workCard = ({ imgSrc, title, body, orientation }: any) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 mt-10">
      {orientation === "right" && (
        <div className="md:flex justify-center mt-10 md:mt-0 md:mr-10 hidden">
          <img
            src={imgSrc}
            alt="QR code"
            className=" object-fit w-[300px] h-[300px] border-2 border-black transition duration-300 ease-in-out transform hover:shadow-2xl"
          />
        </div>
      )}
      <div className="md:col-span-2">
        <div
          className="border-2 border-black   md:mr-44 p-6 bg-white"
          style={{ boxShadow: "20px 20px 0px rgba(200, 180, 160, 0.5)" }}
        >
          <div className=" max-w-[52%]">
            <div className="mb-3.5 font-semibold text-pretty text-2xl">
              {title}
            </div>
            <hr className="border-2 border-green-500" />
          </div>
          <div className="mt-2">{body}</div>
          <div className="flex justify-between mt-7">
            {/* <img src="images/sq.png" alt="square" /> */}
            <div>
              <div className="w-6 h-6 bg-yellow-300 border-[3px] border-black"></div>
              <div className="flex ">
                <div className="ml-[23px] w-6 h-6 bg-yellow-300 border-[3px] border-black"></div>
              </div>
            </div>
            <div>
              <But text={"Read about feature"} />
            </div>
          </div>
        </div>
      </div>
      {orientation === "left" && (
        <div className="flex justify-center mt-10 md:mt-0">
          <img
            src={imgSrc}
            alt="QR code"
            className=" object-fit w-[300px] h-[300px] border-2 border-black transition duration-300 ease-in-out transform hover:shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default workCard;
