import Nav from "./nav";
import Head from "./head";
import Button from "./button";
import Works from "./works";
import Card from "./card";
import Footer from "./footer";
const page = () => {
  return (
    <div className="bg-[#fffddf] w-full h-full">
      <Nav />
      <Head />
      <Button />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10 p-4 md:px-20 mt-10">
        <Card
          title="Explore the Museum"
          body="Discover the rich history and culture at our museum, where artifacts come to life through interactive displays and guided tours. We offer a unique experience for visitors of all ages."
        />
        <Card
          title="Interactive Exhibits"
          body="Engage with our interactive exhibits that allow you to experience history in a hands-on way. From virtual reality simulations to tactile displays, learning has never been this fun!"
        />
        <Card
          title="Cultural Workshops"
          body="Join our cultural workshops to delve deeper into traditional arts and crafts. Participate in pottery-making, weaving, and painting sessions led by skilled artisans."
        />
      </div>

      <div id="works">
        <Works />
      </div>
      <Footer />
    </div>
  );
};

export default page;
