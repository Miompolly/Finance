import React, { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Row1 = () => {
  const { data, isLoading, isError } = useGetKpisQuery();
  
  console.log("data :", data);

  const revenueExpenses = useMemo(() => {
    if (isLoading || isError || !data) {
      return null; // Handle loading or error state
    }

    return data[0]?.monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      expenses,
    }));
  }, [data, isLoading, isError]);

  return (
    <>
      <DashboardBox bgcolor="white" gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses} 
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="white" gridArea="b"></DashboardBox>
      <DashboardBox bgcolor="white" gridArea="c"></DashboardBox>
    </>
  );
}

export default Row1;
