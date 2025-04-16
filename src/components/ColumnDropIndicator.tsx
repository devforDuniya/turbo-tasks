import { ColumnDropIndicatorProps } from "../types/card";

const ColumnDropIndicator: React.FC<ColumnDropIndicatorProps> = ({
  beforeId,
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-board="column-indicator"
      className="w-1 h-full min-h-[8rem] bg-violet-400 rounded opacity-0 transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 group-hover:opacity-100"
      style={{
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
      }}
    />
  );
};

export default ColumnDropIndicator;
