import { useState, useEffect } from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-right">
      <div className="text-2xl font-mono text-primary">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-sm text-gray-500">
        {formatDate(time)}
      </div>
    </div>
  );
};