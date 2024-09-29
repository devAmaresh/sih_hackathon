const head = () => {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/images/head.jpg")',
        objectFit: "cover",
      }}
    >
      <div className="text-pretty md:text-5xl text-4xl font-semibold font-serif text-[#e0e0e0]">
        <div className="text-center pb-3">Explore a Completely New</div>
        <div className="text-center">Museum Experience</div>
      </div>
      <div className="flex justify-center">
        <div className="lg:w-[650px] pt-10 text-center mx-4 md:mx-0 text-[#ffffff]">
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
