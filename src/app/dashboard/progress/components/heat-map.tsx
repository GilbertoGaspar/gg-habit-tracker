import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

interface HeatMapProps {
  data: Record<string, number>;
}

const getHeatColor = (level: number) => {
  if (level >= 4) return "bg-blue-600";
  if (level >= 3) return "bg-blue-500";
  if (level >= 2) return "bg-blue-400";
  if (level >= 1) return "bg-blue-300";
  return "bg-gray-200";
};

const daysOfWeek = [
  { text: "S", id: 0 },
  { text: "M", id: 1 },
  { text: "T", id: 2 },
  { text: "W", id: 3 },
  { text: "T", id: 4 },
  { text: "F", id: 5 },
  { text: "S", id: 6 },
];

export default function Heatmap({ data }: HeatMapProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const offset = getDay(monthStart);
  const blanks = new Array(offset).fill(null);

  return (
    <div className="flex flex-col gap-2 w-[200px] self-center">
      <div className="grid grid-cols-7 gap-1 ">
        {daysOfWeek.map((d) => (
          <div
            key={d.id}
            className="text-center text-xs text-slate-500 w-6 h-6 rounded-sm"
          >
            {d.text}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, idx) => (
          <div key={`blank-${idx}`} className="w-6 h-6 rounded-sm" />
        ))}

        {monthDays.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const level = data[key] || 0;
          return (
            <div
              key={key}
              className={`w-6 h-6 rounded-sm ${getHeatColor(level)}`}
              title={format(day, "MMM d")}
            />
          );
        })}
      </div>
    </div>
  );
}
