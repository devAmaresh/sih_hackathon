const head = () => {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen bg-cover bg-center"
      // style={{
      //   backgroundImage: 'url("/images/head.jpg")',
      //   objectFit: "cover",
      // }}
    >
      <div className="text-pretty md:text-6xl text-4xl font-semibold font-serif text-black px-2 md:px-0">
        <div className="text-center bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent  md:text-6xl text-4xl font-bold pb-3">
          Explore a Completely New
        </div>
        <div className="pb-3 text-center bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent  md:text-6xl text-4xl font-bold">
          Museum Experience
        </div>
      </div>
      <div className="flex justify-center">
        <div className="lg:w-[650px] pt-7 text-center mx-4 md:mx-0 text-black">
          Welcome to an exhilarating voyage through the Vietnam Museum of
          Ethnology, where Vietnamese history and culture come alive through
          innovative AR technology and gamification, creating an immersive and
          boundless experience.
        </div>
      </div>
    </div>
  );
};

export default head;
