import React, { useState, useEffect } from "react";
import { Card, Row, Col, Select } from "antd";
import dynamic from "next/dynamic";

const AnalyticsChart = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    // Fetch data from an API or somewhere else
    const receivedData = [
      { ip: "444.555.666.0", city: "London", country: "England" },
      { ip: "444.555.664.0", city: "Liverpool	", country: "England" },
      { ip: "123.456.789.0", city: "Marseille", country: "France" },
      { ip: "123.256.789.0", city: "Marseille", country: "France" },
      { ip: "123.156.789.0", city: "Marseille", country: "France" },
      { ip: "123.756.789.0", city: "Marseille", country: "France" },
      { ip: "123.856.789.0", city: "Marseille", country: "France" },
      { ip: "987.654.321.0", city: "Lyon", country: "France" },
      { ip: "987.654.311.0", city: "Lyon", country: "France" },
      { ip: "111.222.333.0", city: "Paris", country: "France" },
    ];

    setData(receivedData);
  }, []);

  useEffect(() => {
    // Compute the series data from the received data
    let computedSeries = data.reduce((acc, current) => {
      if (current.city) {
        const city = current.city;
        const country = current.country;
        const cityIndex = acc.findIndex(
          (item) => item.name === `${city} (${country})`
        );

        if (cityIndex === -1) {
          acc.push({ name: `${city} (${country})`, data: [1] });
        } else {
          acc[cityIndex].data[0]++;
        }
      }

      return acc;
    }, []);

    setSeries(computedSeries);

    switch (selectedCountry) {
      case "Tous les pays":
        computedSeries = computedSeries.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        break;
      default:
        computedSeries = computedSeries
          .filter((item) => item.name.includes(selectedCountry))
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
    }
    setSeries(computedSeries);
  }, [data, selectedCountry]);

  useEffect(() => {
    setTotalVisitors(series.reduce((acc, current) => acc + current.data[0], 0));
  }, [series]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  var options = {
    series: series,
    chart: {
      height: 350,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      background: "transparent",
      dropShadow: {
        enabled: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      style: {
        colors: ["#000"],
      },
    },
    plotOptions: {
      bar: {
        vertical: true,
        horizontal: false,
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ["Visiteur(s)"],
    },
  };

  const countries = Array.from(
    new Set(data.map((item) => item.country))
  ).sort();
  countries.unshift("Tous les pays");

  return (
    <>
      <div className="flex flex-col w-full">
        <Row>
          <Col span={24}>
            <Card>
              <div className="flex flex-col">
                <label>Selectionnez un pays</label>
                <Select
                  placeholder="Select a country"
                  defaultValue={"Tous les pays"}
                  onChange={handleCountryChange}
                  style={{ width: "200px", marginBottom: "20px" }}
                >
                  {countries.map((country) => (
                    <Select.Option key={country} value={country}>
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <Chart
                options={options}
                series={series}
                type="bar"
                labels={["Visiteur(s)"]}
                width={"100%"}
                height={500}
              />
            </Card>
          </Col>
        </Row>

        <label className="flex flex-row justify-center mt-8">
          Total des visiteurs : {totalVisitors}
        </label>
      </div>
    </>
  );
};

export default AnalyticsChart;
