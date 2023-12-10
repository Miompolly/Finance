import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { useTheme } from '@emotion/react';
import React, { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Row2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  
  const operationalExpense = useMemo(() => {
    if (!operationalData || operationalData.length === 0) {
      return null;
    }
  
    return operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
      return {
        name: month.substring(0, 3),
        "Operational expenses": operationalExpenses,
        "Non-Operational expenses": nonOperationalExpenses,
      };
    });
  }, [operationalData]);
  
  console.log('operationalData:', operationalData);

  return (
    <>
      <DashboardBox bgcolor="white" gridArea="f"></DashboardBox>
      <DashboardBox bgcolor="white" gridArea="d" style={{ height: '400px' }}>
        <BoxHeader
          title="Operational vs Non Operational expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpense}
            margin={{
              top: 20,
              right: 30,
              left: -10,
              bottom: 70,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
        
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
            />
            <YAxis
           
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
            />

            <Tooltip />
            <Line
              type="monotone"
              dataKey="Non-Operational expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              type="monotone"
              dataKey="Operational expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="white" gridArea="e"></DashboardBox>
    </>
  )
}

export default Row2
