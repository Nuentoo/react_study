import { BackgroundProps } from './type/type';

const Background: React.FC<BackgroundProps> = ({ boxSize, children }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(200, 200, 0, 0.2)',
        height: boxSize,
        width: boxSize,
      }}
      className="rounded-xl shadow-lg"
    >
      {children}
    </div>
  );
};

export default Background;
