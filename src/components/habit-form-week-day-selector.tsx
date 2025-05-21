import { Button } from "./ui/button";

const daysOfWeek = [
  {
    text: "S",
    id: 0,
  },
  {
    text: "M",
    id: 1,
  },
  {
    text: "T",
    id: 2,
  },
  {
    text: "W",
    id: 3,
  },
  {
    text: "T",
    id: 4,
  },
  {
    text: "F",
    id: 5,
  },
  {
    text: "S",
    id: 6,
  },
];

export default function HabitFormWeekDaySelector({
  selectedDays,
  onDayButtonClick,
}: {
  selectedDays: number[];
  onDayButtonClick: (day: number) => void;
}) {
  return (
    <div className="col-span-3 flex gap-1">
      {daysOfWeek.map((currentDay) => (
        <Button
          key={currentDay.id}
          className={`rounded-full h-8 w-8 cursor-pointer ${
            selectedDays.includes(currentDay.id)
              ? "bg-primary"
              : "bg-primary/40"
          } `}
          onClick={() => onDayButtonClick(currentDay.id)}
          type="button"
        >
          {currentDay.text}
        </Button>
      ))}
    </div>
  );
}
