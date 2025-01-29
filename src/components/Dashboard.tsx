import React from "react";
import { useSelector } from "react-redux";
import { FileText, DollarSign } from "lucide-react";
import { RootState } from "../store";
import TaskBoard from "./TaskBoard";
import Analytics from "./Analytics";


const Dashboard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const deals = useSelector((state: RootState) => state.deals.items);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Главная панель</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          icon={<FileText className="h-6 w-6 text-blue-500" />}
          title="Всего задач"
          value={tasks.length.toString()}
        />
        <DashboardCard
          icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
          title="Всего сделок"
          value={deals.length.toString()}
          sum={`Общая сумма: ${deals.reduce((acc, deal) => acc + deal.amount, 0)}$`}
        />
      </div>

      <div className="w-full">
        <TaskBoard maxHeight="500px" />
      </div>

      <div className="w-full">
        <Analytics />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  sum?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  sum,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {sum && <p className="text-sm font-medium text-gray-600">{sum}</p>}
        </div>
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;
