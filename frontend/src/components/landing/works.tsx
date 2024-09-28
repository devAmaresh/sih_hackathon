import But from "./button/but";
const works = () => {
  return (
    <div className="p-10">
      <div className="text-5xl font-semibold text-center">How it Works</div>
      <div className="flex justify-center mt-4">
        <div className="w-[700px] text-center">
          We are proud to announce that our app uses QR code technology to add
          an exciting layer of interactivity to the exploration of precious
          musical instruments. Each musical instrument on display at the museum
          is equipped with a unique QR code that opens a window into their
          musical world.
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 mt-10">
        <div className="md:col-span-2">
          <div
            className="border-2 border-black rounded-2xl  md:mr-72 p-6 bg-white"
            style={{ boxShadow: "20px 20px 0px rgba(74 ,222 ,128, 1)" }}
          >
            <div className=" max-w-[52%]">
              <div className="mb-3.5 font-semibold text-pretty text-2xl">
                Exploration Through QR Code
              </div>
              <hr className="border-2 border-green-500" />
            </div>
            <div className="mt-2">
              By scanning the QR code on a musical instrument with our app, you
              will be taken on a unique journey of discovery. Immediately, you
              will have the opportunity to listen to the sound of the
              instrument, learn about how they are made, and explore the
              historical and artistic stories behind each piece.
            </div>
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
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/flat-background-international-museum-day_23-2150264413.jpg?t=st=1727526615~exp=1727530215~hmac=f16e5c650969003911b9a734fde9d3e9bac3e2109f29f9723d8ff2d0260c2c70&w=996"
            alt="QR code"
            className="rounded-full object-fit w-[300px] h-[300px] border-2 border-black"
          />
        </div>
      </div>
    </div>
  );
};

export default works;
