import WorkCard from "./works/workCard";
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
      <div className="md:px-20 ">
        <WorkCard
          imgSrc="https://img.freepik.com/free-photo/scene-with-young-children-playing-nature-outdoors_23-2151486583.jpg?t=st=1727529279~exp=1727532879~hmac=c2dffdd9922daa50b918be43ee4a8e6c675292c54634839e3ff71fe16af4b58c&w=740"
          title="Exploration Through QR Code"
          body="By scanning the QR code on a musical instrument with our app, you
            will be taken on a unique journey of discovery. Immediately, you
            will have the opportunity to listen to the sound of the instrument,
            learn about how they are made, and explore the historical and
            artistic stories behind each piece."
          orientation="left"
        />
        <WorkCard
          imgSrc="https://img.freepik.com/free-vector/organic-flat-person-meditating-peacefully_23-2148917335.jpg?t=st=1727530725~exp=1727534325~hmac=d91a5eb9ea247544536fd4856ecce361f822a0c1c598e125ff619d77bf5cbbac&w=740"
          title="Book Your Tickets Effortlessly"
          body="Skip the lines and book your tickets instantly through our chatbot! Just tell the chatbot your desired date and time, and it will handle the booking process for you. Experience the convenience of booking without waiting."
          orientation="right"
        />
        <WorkCard
          imgSrc="https://img.freepik.com/free-photo/3d-rendering-girl-skateboard_23-2150898806.jpg?t=st=1727530978~exp=1727534578~hmac=e06b531bf238e75f89da170b5f3d8b44c9b15dd9482417c9661051406b92fc8f&w=740"
          title="Interactive Exhibits"
          body="Immerse yourself in our interactive exhibits that engage all your senses! Explore art and culture through hands-on activities, multimedia displays, and guided tours. Discover the stories behind our collections and connect with history like never before."
          orientation="left"
        />
      </div>
    </div>
  );
};

export default works;
