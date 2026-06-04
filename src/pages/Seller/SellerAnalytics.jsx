import React, { useState, useEffect, useContext } from 'react';
import { orderService } from '../../services/orderService';
import { AuthContext } from '../../context/AuthContext';
import SellerLayout from '../../components/layout/SellerLayout';
import { 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { FiTrendingUp, FiShoppingBag, FiPieChart, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import SkeletonLoader from '../../components/common/SkeletonLoader';

export default function SellerAnalytics() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      try {
        const data = await orderService.getSellerAnalytics(user.id);
        setStats(data);
      } catch (err) {
        console.error('Error fetching analytics details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#0ea5e9'];

  return (
    <SellerLayout>
      
      {/* Title */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-none">
          Analytics & Reports
        </h2>
        <p className="text-xs text-slate-400 mt-1.5">
          Detailed sales projections, department allocations, and item revenue statistics.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="h-72 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-64 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="space-y-8 text-left">
          
          {/* Top Row: Revenue Trend (Full Width Area Chart) */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-850 dark:text-white">
              <FiDollarSign className="text-indigo-500 w-5 h-5" />
              <h3 className="font-heading font-bold text-base">Monthly Revenue Progress ($)</h3>
            </div>
            <div className="h-72 w-full text-xs font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Middle Row: Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Column 1: Unit Sales (Bar Chart) */}
            <div className="bg-white dark:bg-slate-800 border border-slate-105 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-850 dark:text-white">
                <FiBarChart2 className="text-emerald-500 w-5 h-5" />
                <h3 className="font-heading font-bold text-base">Monthly Unit Sales (Volume)</h3>
              </div>
              <div className="h-64 w-full text-xs font-semibold">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlySalesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Column 2: Category Distribution (Pie Chart) */}
            <div className="bg-white dark:bg-slate-800 border border-slate-105 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-850 dark:text-white">
                <FiPieChart className="text-amber-550 w-5 h-5" />
                <h3 className="font-heading font-bold text-base">Department Sales Distribution (%)</h3>
              </div>
              <div className="h-64 w-full flex items-center justify-center text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categorySales}
                      cx="50%"
                      cy="48%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {stats.categorySales.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Bottom Row: Top Selling Products List */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-750 flex items-center gap-2">
              <FiTrendingUp className="text-primary-500 w-5 h-5" />
              <h3 className="font-heading font-bold text-base text-slate-850 dark:text-white font-heading">Top Performing Products</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-905 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                    <th className="p-4">Product Name</th>
                    <th className="p-4 text-right">Units Sold</th>
                    <th className="p-4 text-right font-semibold">Total Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
                  {stats.topProducts.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-55/50 dark:hover:bg-slate-750/30 font-medium">
                      <td className="p-4 text-slate-800 dark:text-white font-bold">{p.name}</td>
                      <td className="p-4 text-right text-slate-500 dark:text-slate-450">{p.sales} units</td>
                      <td className="p-4 text-right text-emerald-600 dark:text-emerald-450 font-extrabold">${p.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </SellerLayout>
  );
}
