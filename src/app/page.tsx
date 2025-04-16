import React from "react";
import TurboKanbanBoard from "../components/TurboKanbanBoard"; 

const HomeScreen = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-gray-800 text-gray-50 flex justify-center items-center">
      <div className="w-full max-w-7xl p-4 md:p-8">
        <TurboKanbanBoard/>
      </div>
    </div>
  );
};

export default HomeScreen;
