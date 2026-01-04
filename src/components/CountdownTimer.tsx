import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

const CountdownTimer = ({ targetDate, label }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-foreground/90 text-primary-foreground px-3 py-2 rounded-lg min-w-[50px]">
        <span className="font-display text-xl md:text-2xl font-bold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="text-center">
      {label && (
        <p className="text-sm text-muted-foreground mb-2 font-medium">{label}</p>
      )}
      <div className="flex gap-2 justify-center">
        <TimeBlock value={timeLeft.days} label="Days" />
        <span className="text-foreground font-bold self-start mt-3">:</span>
        <TimeBlock value={timeLeft.hours} label="Hrs" />
        <span className="text-foreground font-bold self-start mt-3">:</span>
        <TimeBlock value={timeLeft.minutes} label="Min" />
        <span className="text-foreground font-bold self-start mt-3">:</span>
        <TimeBlock value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
};

export default CountdownTimer;
