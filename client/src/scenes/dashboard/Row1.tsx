import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  BarChart,
  Bar,
  Line,
  ResponsiveContainer,
  Rectangle,
} from 'recharts'
import { useTheme } from '@emotion/react'
import BoxHeader from '@/components/BoxHeader'

const Row1 = () => {
  const { data, isLoading, isError } = useGetKpisQuery()
  const { palette } = useTheme()

  console.log('data :', data)

  const revenueExpenses = useMemo(() => {
    if (isLoading || isError || !data) {
      return null // Handle loading or error state
    }

    return data[0]?.monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
      expenses: expenses,
    }))
  }, [data, isLoading, isError])


  const profitRevenue = useMemo(() => {
    if (isLoading || isError || !data) {
      return null // Handle loading or error state
    }

    return data[0]?.monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
      profit:revenue - expenses
    }))
  }, [data, isLoading, isError])


  const revenue = useMemo(() => {
    if (isLoading || isError || !data) {
      return null // Handle loading or error state
    }

    return data[0]?.monthlyData.map(({ month, revenue }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
    
    }))
  }, [data, isLoading, isError])



  return (
    <>
      <DashboardBox bgcolor="white" gridArea="a" style={{ height: '400px' }}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents Revenue and Bottom line represents Expenses"
          sideText="+4%"
        />

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={{ strokeWidth: '0' }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="white" gridArea="b" style={{ height: '400px' }}>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line represents Profit and Bottom line represents Revenue"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={profitRevenue}
            margin={{
              top: 20,
              right: 30,
              left: -10,
              bottom: 55,
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
            <Legend height={20} wrapperStyle={{ margin: '0 0 10px 0' }} />
            <Line
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="white" gridArea="c" style={{ height: '300px' }}>
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Graph is representing Revenue Month by Month"
          sideText="+4%"
        />
   <ResponsiveContainer width="100%" height="100%">
  <BarChart
    width={500}
    height={300}
    data={revenue}
    margin={{
      top: 17,
      right: 35,
      left: -38,
      bottom: 60,
    }}
  >
    <defs>
      <linearGradient id="colorRevenue">
        <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
        <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
    <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
    <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
    <Tooltip />
    <Bar dataKey="Revenue" fill="url(#colorRevenue)" />
  </BarChart>
</ResponsiveContainer>

      </DashboardBox>
    </>
  )
}

export default Row1
