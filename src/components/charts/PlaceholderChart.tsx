
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlaceholderChartProps {
  data: any[];
  title?: string;
}

const PlaceholderChart: React.FC<PlaceholderChartProps> = ({ data, title }) => {
  // Assuming data is an array of objects with 'name' and 'value' keys for a simple bar chart
  const sampleData = data.length > 0 ? data : [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 200 },
    { name: 'D', value: 278 },
    { name: 'E', value: 189 },
  ];

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm h-64 md:h-80">
      {title && <h3 className="text-md font-medium text-gray-700 mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlaceholderChart;
