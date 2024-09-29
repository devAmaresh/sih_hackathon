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
        <div className="mb-16">
          <WorkCard
            imgSrc="https://cdn.prod.website-files.com/61bcac7b8c69b74b8d5c2b99/66c4afe082e2a6acb12405eb_Serene%20Spectrum.jpg"
            title="Multilingual Support"
            body="Our chatbot accommodates diverse global audiences by offering multilingual support. Visitors can interact in their preferred language, breaking down communication barriers and making museum experiences accessible to everyone. This feature not only fosters inclusivity but also enhances engagement, allowing users to fully appreciate the exhibits and information presented."
            orientation="left"
          />
        </div>
        <div className="mb-16">
          <WorkCard
            imgSrc="https://yellow.ai/wp-content/uploads/2022/02/Chatbots-for-Travel-Industry.jpg"
            title="Seamless Ticketing"
            body="Skip the queues and book your tickets effortlessly through our chatbot! With secure payment integration and real-time updates, visitors can purchase tickets without the hassle of waiting in line. The chatbot provides instant confirmation, QR codes for entry, and notifications about upcoming events, ensuring a smooth and enjoyable experience from start to finish."
            orientation="right"
          />
        </div>
        <div className="mb-16">
          <WorkCard
            imgSrc="https://images.stockcake.com/public/8/b/9/8b9fbd3a-20a6-4a95-84fb-71ca586ae68e_large/exploring-ancient-artifacts-stockcake.jpg"
            title="Interactive Information Access"
            body="Enhance your visit by engaging with our chatbot. Visitors can upload images of artifacts or type in questions to receive detailed information, fascinating anecdotes, and historical context. This interactive feature not only enriches the learning experience but also encourages deeper engagement with the exhibits, making every visit informative and enjoyable."
            orientation="left"
          />
        </div>
        <div className="mb-16">
          <WorkCard
            imgSrc="https://wordpress.mapsted.com/wp-content/uploads/2023/06/Interactive-Exhibitions-The-Role-of-Geolocation-in-Hands-On-Museum-Displays.jpg"
            title="24/7 Accessibility"
            body="Our chatbot is available 24/7 across websites, apps, and social media, ensuring that visitors can access information and book tickets whenever they need. This constant availability promotes inclusivity for all users, including those who may have disabilities or unique scheduling needs. Visitors can explore the museum's offerings and get assistance at their convenience, enhancing their overall experience."
            orientation="right"
          />
        </div>
      </div>
    </div>
  );
};

export default works;
