import React from 'react';
import { useQuery } from 'react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface CountryInfo {
  _id: string;
  lat: number;
  long: number;
}

interface Country {
  country: string;
  countryInfo: CountryInfo;
  active: number;
  recovered: number;
  deaths: number;
}

const fetchCovidData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  return response.json();
};

const fetchHistoricalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.json();
};

const fetchCountryData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  return response.json();
};

const Dashboard: React.FC = () => {
  const { data: covidData } = useQuery('covidData', fetchCovidData);
  const { data: historicalData } = useQuery('historicalData', fetchHistoricalData);
  const { data: countryData } = useQuery<Country[]>('countryData', fetchCountryData);

  const chartData = {
    labels: historicalData ? Object.keys(historicalData.cases) : [],
    datasets: [
      {
        label: 'Cases',
        data: historicalData ? Object.values(historicalData.cases) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="my-4">
        <Line data={chartData} />
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold">Global COVID-19 Statistics</h2>
        <p>Total Cases: {covidData?.cases.toLocaleString()}</p>
        <p>Total Deaths: {covidData?.deaths.toLocaleString()}</p>
        <p>Total Recovered: {covidData?.recovered.toLocaleString()}</p>
      </div>
      <div className="my-4">
        <MapContainer style={{ height: '500px', width: '100%' }} center={[51.505, -0.09]} zoom={2}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {countryData?.map((country) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h2>{country.country}</h2>
                  <p>Active: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
