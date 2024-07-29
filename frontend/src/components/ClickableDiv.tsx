export type Props = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const ClickableDiv = ({ title, isActive, onClick }: Props) => {
  return (
    <div
      className={`p-2 px-4 rounded-lg text-white cursor-pointer transition-all duration-300 m-2
        ${
          isActive ? "bg-blue-900 shadow-lg" : "bg-gray-300 hover:bg-blue-300"
        }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default ClickableDiv;
