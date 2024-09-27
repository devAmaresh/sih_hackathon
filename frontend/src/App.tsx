import Chat from "./components/chat";
import Spline from "@splinetool/react-spline";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <Spline scene="https://prod.spline.design/vt0QAKKnXoMvq2sk/scene.splinecode" />
        <Chat />
      </div>
    </>
  );
}

export default App;
