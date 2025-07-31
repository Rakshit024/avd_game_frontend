'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';
import { backendUrl } from '@/config/envFile';

const ChartPage = () => {
  const [metaData, setMetaData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.post(`${backendUrl}/getData`, {
        table: 'point',
      });

      const formattedData = res.data.data.map((e) => ({
        id: e.id,
        points: e.points,
        group: e.group,
      }));

      setMetaData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-screen bg-white dark:bg-background">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="">
          <CardTitle className="text-xl text-center">
            Group Points Bar Chart
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-x-hidden">
          {/* Set fixed width to handle long horizontal charts */}
          <div className=" h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metaData}
                margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="group"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fontSize: 21 }}
                />
                <YAxis />
                <Tooltip
                  wrapperStyle={{ zIndex: 100 }}
                  contentStyle={{ fontSize: '50px' }}
                />
                <Bar
                  dataKey="points"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartPage;
