import React, { useState, useEffect, useContext } from 'react';
import { orderService } from '../../services/orderService';
import { AuthContext } from '../../context/AuthContext';
import SellerLayout from '../../components/layout/SellerLayout';
import StatsCards from '../../components/seller/StatsCards';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FiShoppingBag, FiTrendingUp, FiPlus, FiCalendar } from 'react-icons/fi';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function SellerDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const analytics = await orderService.getSellerAnalytics(user.id);
        const list = await orderService.getSellerOrders(user.id);
        setStats(analytics);
        setOrders(list.slice(0, 5)); // Show top 5 recent orders
      } catch (err) {
        console.error('Error fetching seller stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-750 dark:bg-emerald-950/20 dark:text-emerald-400';
      case 'Shipped':
        return 'bg-blue-50 text-blue-750 dark:bg-blue-950/20 dark:text-blue-400';
      case 'Processing':
        return 'bg-amber-50 text-amber-750 dark:bg-amber-950/20 dark:text-amber-400';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400';
    }
  };

  return (
    <SellerLayout>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-none">
            Dashboard Overview
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            Real-time shop sales totals, order pipelines, and monthly revenue performance.
          </p>
        </div>
        <Link to="/seller/add-product">
          <Button icon={FiPlus} size="sm" className="py-2.5">
            Add Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="h-28 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-28 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-28 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-28 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
          <div className="h-80 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      ) : (
        <div className="space-y-8">

          {/* KPI StatsCards */}
          <StatsCards stats={stats.kpis} />

          {/* Revenue Area Chart */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 text-slate-850 dark:text-white">
              <FiTrendingUp className="text-primary-500 w-5 h-5" />
              <h3 className="font-heading font-bold text-base">Revenue Trajectory ($)</h3>
            </div>

            <div className="h-64 sm:h-72 w-full text-xs font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incoming Orders Table */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-750 flex items-center gap-2">
              <FiShoppingBag className="text-primary-500 w-5 h-5" />
              <h3 className="font-heading font-bold text-base text-slate-850 dark:text-white">Recent Received Orders</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Delivery To</th>
                    <th className="p-4 text-right">Items</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 text-xs font-medium">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{o.id}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><FiCalendar /> {o.date}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{o.shippingAddress.city}, {o.shippingAddress.state}</td>
                      <td className="p-4 text-right text-slate-500">{o.items.reduce((sum, item) => sum + item.quantity, 0)} items</td>
                      <td className="p-4 text-right font-extrabold text-slate-900 dark:text-white">${o.summary.total.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
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
