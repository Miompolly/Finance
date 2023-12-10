export interface expensesByCategory {
  salaries: number
  supplies: number
  services: number
}
export interface Day {
  id: string
  date: string
  revenue: number
  expenses: number
}
export interface Month {
  id: string
  month: string
  revenue: number
  expenses: number
  nonOperationalExpenses: number
  operationalExpenses: number
}

export interface GetKpisResponse {
  id: string
  _id: string
  totalProfit: number
  totalRevenue: number
  totalExpenses: number
  expensesByCategory: expensesByCategory
  monthlyData: Array<Month>
  dailyData: Array<Day>
}

export interface GetProductsResponse {
  id: string
  _id: string
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updateAt: string;
 
}



