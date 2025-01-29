import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { RootState } from "../store";
import { startOfWeek, eachDayOfInterval, format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const startDate = startOfWeek(new Date(), { locale: ru });
  const weekDays = eachDayOfInterval({
    start: startDate,
    end: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000),
  });

  const weeklyData = weekDays.map((day) => ({
    name: format(day, "EEE", { locale: ru }),
    tasks: tasks.filter((task) => isSameDay(new Date(task.createdAt), day))
      .length,
  }));

  // Task status distribution
  const statusData = [
    {
      name: "Ожидание",
      value: tasks.filter((t) => t.status === "pending").length,
    },
    {
      name: "В процессе",
      value: tasks.filter((t) => t.status === "in_progress").length,
    },
    {
      name: "Завершено",
      value: tasks.filter((t) => t.status === "completed").length,
    },
  ].filter((status) => status.value > 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Недельная активность
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Распределение статусов задач
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((en, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
