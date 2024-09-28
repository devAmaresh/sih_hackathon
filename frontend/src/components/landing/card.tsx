const Card = ({ title, body }: any) => {
  return (
    <div>
      <div className="border-2 border-black rounded-2xl p-5 bg-white shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-2 text-black">{title}</h2>
        <div className="text-gray-700 mb-4">{body}</div>
      </div>
    </div>
  );
};

export default Card;
