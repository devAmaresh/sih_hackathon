import MyChatBot from "./components/chatbot";
import Spline from "@splinetool/react-spline";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <Spline scene="https://prod.spline.design/vt0QAKKnXoMvq2sk/scene.splinecode" />
        <MyChatBot />
      </div>
    </>
  );
}

export default App;
