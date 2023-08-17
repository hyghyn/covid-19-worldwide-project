import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ShowLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="case"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="recover" stroke="#82ca9d" />
        <Line type="monotone" dataKey="death" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ShowLineChart;
