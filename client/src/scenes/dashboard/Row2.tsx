import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

const Row2 = () => {
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ]
  const { palette } = useTheme()
  const { data: operationalData } = useGetKpisQuery()
  const pieColors = [palette.primary[300], palette.primary[800]]
  const { data: productData } = useGetProductsQuery()

  const operationalExpense = useMemo(() => {
    if (!operationalData || operationalData.length === 0) {
      return null
    }

    return operationalData[0].monthlyData.map(
      ({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          'Operational expenses': operationalExpenses,
          'Non-Operational expenses': nonOperationalExpenses,
        }
      },
    )
  }, [operationalData])

  const productExpenseData = useMemo(() => {
    try {
      if (!productData || productData.length === 0) {
        console.log('Product data is empty.');
        return null;
      }
  
      const mappedData = productData[0].map(({ _id, price, expense }) => ({
        id: _id,
        price,
        expense,
      }));
  
      console.log('Product Expense Data:', mappedData);
  
      return mappedData;
    } catch (error) {
      console.error('Error fetching product expense data:', error.message);
      return null; // or an empty array, depending on your use case
    }
  }, [productData]);
  

  
  return (
    <>
      <DashboardBox bgcolor="white" gridArea="f" style={{ height: '300px' }}>
        <BoxHeader title="Product Price vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
           width={500}
           height={400}
            margin={{
              top: 10,
              right: 20,
              bottom: 120,
              left: -20,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}
            tickFormatter={(v)=>`$ ${v}`}
            
            />
            <YAxis type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}
            tickFormatter={(v)=>`$ ${v}`}
            
            />
            <ZAxis type="number" range={[20]}/>
            <Tooltip formatter={(v)=>`$ ${v}`}/>
            <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
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
      <DashboardBox bgcolor="white" gridArea="e" >
        <BoxHeader title="Compaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 20,
              right: 25,
              left: 30,
              bottom: 40,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">Finance goals of the compony</Typography>
          </Box>
          <Box ml="-0.7rem" flexBasis="40%">
            <Typography variant="h5">Losses that is desired</Typography>
            <Typography variant="h6">Losses are down 25 %</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Profit are up by 30% from last Month .
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
    </>
  )
}

export default Row2
