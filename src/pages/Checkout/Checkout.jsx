import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiTruck, FiCreditCard, FiEye, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { cartItems, subtotal, discount, shipping, tax, total, clearCart, appliedCoupon } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review, 4: Confirmation
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // If cart is empty and we aren't in confirmation mode, go back to cart
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-slate-400 text-sm">Your cart is empty. Please add items to checkout.</p>
        <Link to="/cart">
          <Button>Back to Cart</Button>
        </Link>
      </div>
    );
  }

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSubmit = (payment) => {
    setPaymentMethod(payment);
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        userId: user.id,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress,
        paymentMethod: {
          method: paymentMethod.method,
          details: {
            cardNumber: paymentMethod.method === 'card' ? `**** **** **** ${paymentMethod.details.cardNumber.slice(-4)}` : undefined,
            upiId: paymentMethod.method === 'upi' ? paymentMethod.details.upiId : undefined,
          }
        },
        summary: { subtotal, discount, shipping, tax, total },
      };

      const result = await orderService.createOrder(orderPayload);
      setPlacedOrder(result);
      clearCart();
      setStep(4);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stepIndicators = [
    { num: 1, label: 'Shipping', icon: FiTruck },
    { num: 2, label: 'Payment', icon: FiCreditCard },
    { num: 3, label: 'Review', icon: FiEye },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Wizard Steps Indicators - Hidden on step 4 */}
      {step < 4 && (
        <div className="flex items-center justify-center gap-4 md:gap-12 pb-4 border-b border-slate-100 dark:border-slate-800">
          {stepIndicators.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            
            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                      ${isActive ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25' : ''}
                      ${!isCompleted && !isActive ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-550' : ''}
                    `}
                  >
                    {isCompleted ? <FiCheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${isActive ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < stepIndicators.length - 1 && (
                  <div className={`h-0.5 w-10 md:w-20 rounded ${step > s.num ? 'bg-emerald-500' : 'bg-slate-205 dark:bg-slate-800'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Checkout Forms Card */}
      {step < 4 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700/80 shadow-sm">
          {step === 1 && (
            <AddressForm
              onSubmit={handleAddressSubmit}
              savedAddresses={user?.addresses || []}
              defaultValues={shippingAddress}
            />
          )}

          {step === 2 && (
            <PaymentForm
              onSubmit={handlePaymentSubmit}
              onBack={() => setStep(1)}
              defaultValues={paymentMethod}
            />
          )}

          {step === 3 && (
            <OrderSummary
              cartItems={cartItems}
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
              pricing={{ subtotal, discount, shipping, tax, total }}
              onPlaceOrder={handlePlaceOrder}
              onBack={() => setStep(2)}
              isLoading={loading}
            />
          )}
        </div>
      ) : (
        // Step 4: Success confirmation panel
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center shadow-xs">
            <FiCheckCircle className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-905 dark:text-white leading-none">
              Order Placed Successfully!
            </h2>
            <p className="text-xs text-slate-400">
              Thank you for shopping with us. Your transaction is complete.
            </p>
          </div>

          {placedOrder && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-750 text-left w-full space-y-2.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="text-slate-800 dark:text-white">Within 3-5 Business Days</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-400">Total Charged:</span>
                <span className="text-primary-600 dark:text-primary-400 font-bold">${placedOrder.summary.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
            <Link to="/orders" className="flex-1">
              <Button variant="outline" icon={FiShoppingBag} className="w-full py-2.5 text-xs">
                View My Orders
              </Button>
            </Link>
            <Link to="/products" className="flex-1">
              <Button icon={FiArrowRight} iconPosition="right" className="w-full py-2.5 text-xs">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

      )}

    </div>
  );
}
