import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressChartProps {
  data: { day: string; value: number }[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 12,
            fill: "#64748b",
          }}
          padding={{ left: 20, right: 20 }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "0.5rem",
            border: "none",
            background: "#1e293b",
            color: "white",
            fontSize: "0.875rem",
          }}
          cursor={{ stroke: "transparent" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{
            r: 4,
            strokeWidth: 2,
            stroke: "#ffffff",
            fill: "#3b82f6",
          }}
          activeDot={{
            r: 6,
            strokeWidth: 2,
            stroke: "#3b82f6",
            fill: "#ffffff",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
