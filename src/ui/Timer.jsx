import React, { useEffect, useState } from "react";
import formatTime from "../utils/helper";
import { Clock } from "lucide-react";
const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <Clock className="w-5 h-5 text-orange-600 mr-2" />
        <span className="font-semibold text-orange-800">
          Time Remaining: {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};
export default Timer;
