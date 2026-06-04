import React from 'react';
import { FiBox, FiShoppingBag, FiDollarSign, FiUsers } from 'react-icons/fi';

export default function StatsCards({ stats }) {
  if (!stats) return null;

  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${stats.revenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+14.2% vs last month',
      icon: FiDollarSign,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      change: '+8.3% vs last month',
      icon: FiShoppingBag,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30',
    },
    {
      label: 'Products Listed',
      value: stats.totalProducts,
      change: '+3 new items added',
      icon: FiBox,
      color: 'text-amber-605 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30',
    },
    {
      label: 'Active Customers',
      value: stats.customers,
      change: '+18.5% growth rate',
      icon: FiUsers,
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700/80 shadow-sm flex items-center justify-between text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.label}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {card.value}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                {card.change}
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border ${card.color} flex-shrink-0`}>
              <IconComponent className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
