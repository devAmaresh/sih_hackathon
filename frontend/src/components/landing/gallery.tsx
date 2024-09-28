import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const Gallery = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2017/03/26/20/03/kaiser-wilhelm-2176402_1280.jpg",
    "https://www.metmuseum.org/-/media/images/about-the-met/collection-areas/arms-and-armor/arms-and-armor_marquee.jpg?as=1&mh=920&mw=2320&sc_lang=en&hash=31446A1AFD675399F39E7529741DDF54",
    "https://www.metmuseum.org/-/media/images/about-the-met/collection-areas/arms-and-armor/wills-staging/collection/aa_collection_highlights.jpg?as=1&mh=720&mw=1520&sc_lang=en&hash=6F88ECCCD90FFE01E58DE20A4BCB71BE",
    "https://cdn.sanity.io/images/cctd4ker/production/5834e5357b0028a481afda303968baf7de749296-5121x1707.jpg?w=1920&q=75&auto=format",
    "https://cdn.sanity.io/images/cctd4ker/production/6f7591d0c733a759b48700ae82a2ab048fc2f1f0-760x507.jpg?w=1200&q=75&fit=clip&auto=format",
    "https://cdn.sanity.io/images/cctd4ker/production/17f6f941a1c759f04f569cfacd0ac11bcae7fdc5-5121x1707.jpg?w=1920&q=75&auto=format",
    "https://www.masalathai.com/2015/wp-content/uploads/2023/10/arafed-room-with-lot-statues-paintings-walls-generative-ai-1170x1170.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImages = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImages = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Calculate indices for the current set of images to display
  const displayedImages = [
    images[currentIndex % images.length],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length],
  ];

  return (
    <div className="mt-10 p-5" id="gallery">
      <div className="text-5xl font-semibold text-center font-serif p-5">
        Gallery
      </div>
      <div className="relative flex items-center justify-center">
        <button
          onClick={prevImages}
          className="bg-white hover:bg-zinc-700 rounded-full p-2 z-10 absolute left-0"
        >
          <BsArrowLeftShort className="w-7 h-7 text-black hover:text-white" />
        </button>

        <div className="grid grid-cols-3 justify-center gap-4">
          {displayedImages.map((image, index) => (
            <div className="h-96 w-full" key={index}>
              <img
                src={image}
                alt={`Gallery Image ${currentIndex + index + 1}`}
                className="object-contain h-full w-full transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
          ))}
        </div>

        <button
          onClick={nextImages}
          className="absolute right-4 text-white bg-white hover:bg-zinc-700 rounded-full p-2 z-10"
        >
          <BsArrowRightShort className="w-7 h-7 text-black hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
