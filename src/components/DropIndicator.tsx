const DropIndicator = ({ beforeId, column }: any) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0 transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 group-hover:opacity-100"
        style={{
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      />
    );
  };
  
  export default DropIndicator;
  