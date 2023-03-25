import LineChart from "../../chart/analyticsLigne";
import AnalyticsBarVisitor from "../../chart/analyticsBarVisitor";
const Analytics = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <AnalyticsBarVisitor />

        <LineChart />
      </div>
    </>
  );
};

export default Analytics;
