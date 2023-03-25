import React, { useState, useEffect } from "react";
import { Card, Row, Col, Select } from "antd";
import dynamic from "next/dynamic";
import { GetVisitor } from "../../services/panel/visitor/get.visitor";
import Loader from "../loader/loader";

const AnalyticsBarVisitor = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Tous les pays");
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Vérifie si la largeur de la fenêtre est inférieure à 768px (taille mobile)
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Appel initial pour définir l'état mobile/non-mobile
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTextXPosition = (isMobile, position) => {
    return isMobile ? position.mobile : position.desktop;
  };

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingVisitors(true);

    GetVisitor().then((res) => {
      const received = res.data.map((item) => ({
        ip: item.ip,
        city: item.city || null,
        country: item.country || null,
      }));

      setData(received);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredData =
      selectedCountry === "Tous les pays"
        ? data
        : data.filter((item) => item.country === selectedCountry);

    const computedSeries = filteredData.reduce((acc, current) => {
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
    setTotalVisitors(
      computedSeries.reduce((acc, current) => acc + current.data[0], 0)
    );
    setIsLoadingVisitors(false);
  }, [data, selectedCountry]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const countries = [...new Set(data.map((item) => item.country))]
    .filter(Boolean)
    .sort();

  countries.unshift("Tous les pays");

  const options = {
    series: series,
    chart: {
      height: 350,
      type: "bar",
      stacked: false,
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
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
      labels: {
        show: false,
      },
    },

    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: getTextXPosition(isMobile, { mobile: 40, desktop: 120 }),
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Row>
            <Col span={24}>
              <Card style={{ backgroundColor: "none" }}>
                <div className="flex flex-col">
                  <label>Selectionnez un pays</label>
                  <Select
                    placeholder="Select a country"
                    defaultValue={"Tous les pays"}
                    onChange={handleCountryChange}
                    style={{ width: "200px", marginBottom: "20px" }}
                  >
                    {countries.map((country) =>
                      country != null ? (
                        <Select.Option key={country} value={country}>
                          {country}
                        </Select.Option>
                      ) : null
                    )}
                  </Select>
                </div>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  labels={["Visiteur(s)"]}
                  width={"100%"}
                  height={"auto"}
                />
              </Card>
            </Col>
          </Row>
          {!isLoadingVisitors && !isLoading ? (
            <>
              <hr style={{ opacity: 0.1 }}></hr>
              <label className="flex flex-row justify-center m-8">
                Total des visiteurs : {totalVisitors}
              </label>
            </>
          ) : null}
          <hr style={{ opacity: 0.1 }}></hr>
        </>
      ) : (
        <div className="flex flex-row justify-center m-8">
          <Loader
            props={{
              width: "75px",
              height: "75px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default AnalyticsBarVisitor;
