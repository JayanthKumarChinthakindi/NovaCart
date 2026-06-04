import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiCheckCircle, FiPackage, FiChevronDown, FiChevronUp, FiCalendar, FiClock } from 'react-icons/fi';
import { orderService } from '../../services/orderService';
import { AuthContext } from '../../context/AuthContext';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) return;
      try {
        const data = await orderService.getOrdersByUser(user.id);
        setOrders(data);
        if (data.length > 0) {
          setExpandedOrderId(data[0].id); // Expand the most recent order
        }
      } catch (err) {
        console.error('Error loading orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, [user]);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'Shipped':
        return 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30';
      case 'Processing':
        return 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100 dark:bg-slate-805 dark:text-slate-400 dark:border-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="h-8 bg-slate-205 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
        <div className="space-y-4">
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-none">
          Order History
        </h1>
        <p className="text-xs text-slate-400 mt-1.5">
          View details, shipping status, and receipts for all your transactions.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-16 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <FiShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-sm">When you buy products from sellers, your orders will show up here.</p>
          <Link to="/products" className="mt-6">
            <Button size="sm">Go to Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Header Collapsible Trigger */}
                <div
                  onClick={() => toggleOrderExpand(order.id)}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl hidden sm:block">
                      <FiPackage className="w-5.5 h-5.5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{order.id}</span>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5" /> Placed on {order.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Amount</span>
                      <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">${order.summary.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details body */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 dark:border-slate-750 bg-slate-50/20 dark:bg-slate-900/10 space-y-6">
                    
                    {/* Items List */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Purchased Items</h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl overflow-hidden">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded bg-slate-50" />
                              <div className="text-left">
                                <Link to={`/products/${item.id}`} className="text-xs font-semibold text-slate-800 dark:text-white hover:text-primary-600 line-clamp-1">
                                  {item.name}
                                </Link>
                                <p className="text-[10px] text-slate-400 mt-0.5">Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Info Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Address */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Shipping Address</h4>
                        <div className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                          <p className="font-bold text-slate-850 dark:text-white">{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</p>
                          <p className="font-semibold">{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Payment Details</h4>
                        <div className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed capitalize">
                          <p className="font-bold text-slate-850 dark:text-white">{order.paymentMethod.method}</p>
                          {order.paymentMethod.details.cardNumber && <p className="text-slate-400">Card: {order.paymentMethod.details.cardNumber}</p>}
                          {order.paymentMethod.details.upiId && <p className="text-slate-400">UPI: {order.paymentMethod.details.upiId}</p>}
                        </div>
                      </div>

                      {/* Order Timeline progress */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Delivery Timeline</h4>
                        <div className="relative border-l border-slate-200 dark:border-slate-700 pl-4 space-y-4">
                          {order.timeline && order.timeline.map((event, idx) => (
                            <div key={idx} className="relative flex flex-col text-left">
                              <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-800" />
                              <span className="text-xs font-bold text-slate-805 dark:text-white">{event.status}</span>
                              <span className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-1"><FiClock /> {event.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
