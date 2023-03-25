import React, { useEffect, useState } from "react";
import { Select, Card, Col, Row } from "antd";
import dynamic from "next/dynamic";
import { GetVisitor } from "../../services/panel/visitor/get.visitor";

const { Option } = Select;

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("daily");
  const [chartData, setChartData] = useState({
    categories: [],
    seriesData: [],
  });
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [2023],
      title: {
        text: "Dates",
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      title: {
        text: "Nombre de visiteurs",
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        format: "dd/MM/yyyy",
        formatter: undefined,
      },
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 500,
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
  });

  useEffect(() => {
    setIsLoading(true);
    GetVisitor().then((res) => {
      const received = res.data.map((item) => {
        return {
          timestampdate: item.timestampdate,
          nombre_visiteurs: item.nombre_visiteurs,
        };
      });
      setData(received);
    });
  }, []);

  useEffect(() => {
    setChartData(generateChartData(data, chartType));
  }, [data, chartType]);

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  const generateChartData = (data, chartType) => {
    const categories = [];
    const seriesData = [];
    const chartData = { categories, seriesData };
    let prevDate = null;
    let currentTotal = 0;

    data.forEach((item) => {
      const date = getDateFromTimestamp(item.timestampdate);

      switch (chartType) {
        case "daily":
          if (!prevDate || prevDate === date) {
            currentTotal += 1;
            prevDate = date;
          } else {
            categories.push(prevDate);
            seriesData.push(currentTotal);
            currentTotal = 1;
            prevDate = date;
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          break;
        case "weekly":
          const weekStartDate = getWeekStartDate(date);
          if (!prevDate || prevDate === weekStartDate) {
            currentTotal += 1;
            prevDate = weekStartDate;
          } else {
            categories.push(getFormattedDate(prevDate, "dd/MM/yyyy"));
            seriesData.push(currentTotal);
            currentTotal = 1;
            prevDate = weekStartDate;
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          break;
        case "monthly":
          const monthStartDate = getMonthStartDate(date);
          if (!prevDate || prevDate === monthStartDate) {
            currentTotal += 1;
            prevDate = monthStartDate;
          } else {
            categories.push(getFormattedDate(prevDate, "MMM yyyy"));
            seriesData.push(currentTotal);
            currentTotal = 1;
            prevDate = monthStartDate;
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          break;
        case "yearly":
          const yearStartDate = getYearStartDate(date);
          if (!prevDate || prevDate === yearStartDate) {
            currentTotal += 1;
            prevDate = yearStartDate;
          } else {
            categories.push(getFormattedDate(prevDate, "yyyy"));
            seriesData.push(currentTotal);
            currentTotal = 1;
            prevDate = yearStartDate;
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          break;
        default:
          break;
      }
    });

    if (prevDate) {
      categories.push(
        getFormattedDate(
          prevDate,
          chartType === "yearly" ? "yyyy" : "dd/MM/yyyy"
        )
      );
      seriesData.push(currentTotal);
    }

    setOptions({
      ...options,
      xaxis: {
        categories,
        title: {
          text: "Dates",
        },
      },
      tooltip: {
        ...options.tooltip,
        x: {
          ...options.tooltip.x,
          formatter: (value) =>
            getFormattedDate(
              value,
              chartType === "yearly" ? "yyyy" : "dd/MM/yyyy"
            ),
        },
      },
    });

    return chartData;
  };

  const getFormattedDate = (date, format) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      timeZone: "UTC",
      year: format === "yyyy" ? "numeric" : undefined,
      month: format === "MMM yyyy" ? "short" : undefined,
      day: format === "dd/MM/yyyy" ? "2-digit" : undefined,
    });
  };

  const getDateFromTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toISOString().substr(0, 10);
  };

  const getWeekStartDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDay() || 7;
    newDate.setDate(newDate.getDate() - day + 1);
    return newDate.toISOString().substr(0, 10);
  };

  const getMonthStartDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate.toISOString().substr(0, 10);
  };

  const getYearStartDate = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(0, 1);
    return newDate.toISOString().substr(0, 10);
  };

  const series = [
    {
      name: "Nombre de visiteurs",
      data: chartData.seriesData,
    },
  ];
  return (
    <>
      {!isLoading ? (
        <>
          <Row>
            <Col span={24}>
              <Card style={{ backgroundColor: "none" }}>
                <div className="flex flex-col">
                  <label>Selectionnez une date</label>
                  <Select
                    defaultValue="daily"
                    onChange={handleChartTypeChange}
                    style={{ width: "200px", marginBottom: "20px" }}
                  >
                    <Option value="daily">Jour</Option>
                    <Option value="weekly">Semaine</Option>
                    <Option value="monthly">Mois</Option>
                    <Option value="yearly">Année</Option>
                  </Select>
                </div>

                <Chart
                  options={options}
                  series={series}
                  type="line"
                  height={"auto"}
                />
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default LineChart;
