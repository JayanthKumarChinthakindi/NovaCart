import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiBox } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { productService } from '../../services/productService';
import { AuthContext } from '../../context/AuthContext';
import SellerLayout from '../../components/layout/SellerLayout';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';

export default function SellerProducts() {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProducts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await productService.getProducts({ sellerId: user.id });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching seller products', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSellerProducts();
  }, [fetchSellerProducts]);

  const handleDelete = async (productId, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.deleteProduct(productId);
        toast.success(`"${name}" deleted successfully.`);
        // Refresh product list
        fetchSellerProducts();
      } catch (err) {
        toast.error('Failed to delete product.');
      }
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400';
    if (stock <= 15) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400';
    return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400';
  };

  return (
    <SellerLayout>
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-none">
            Manage Products
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            Add, update, or remove items from your store.
          </p>
        </div>
        <Link to="/seller/add-product">
          <Button icon={FiPlus} size="sm" className="py-2.5">
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Main product inventory container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-905 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                <th className="p-4">Item Thumbnail</th>
                <th className="p-4">Name</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">Stock</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
              {loading ? (
                <SkeletonLoader type="table-row" count={4} />
              ) : products.length > 0 ? (
                products.map((p) => {
                  const activePrice = p.discountPrice || p.price;
                  return (
                    <tr key={p.id} className="hover:bg-slate-55/50 dark:hover:bg-slate-750/30 font-medium">
                      
                      {/* Image */}
                      <td className="p-4">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-200 dark:border-slate-700"
                        />
                      </td>

                      {/* Name & Category */}
                      <td className="p-4 max-w-xs md:max-w-md">
                        <Link to={`/products/${p.id}`} className="font-bold text-slate-900 dark:text-white hover:text-primary-600 truncate block">
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-400 capitalize block mt-0.5">{p.category}</span>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-right text-slate-900 dark:text-white font-extrabold">
                        ${activePrice.toFixed(2)}
                      </td>

                      {/* Stock count */}
                      <td className="p-4 text-right text-slate-600 dark:text-slate-300">
                        {p.stock} units
                      </td>

                      {/* Stock Status Chip */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStockStatus(p.stock)}`}>
                          {p.stock === 0 ? 'Out of Stock' : p.stock <= 15 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/products/${p.id}`}
                            className="p-1.5 text-slate-450 hover:text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-md transition-colors"
                            title="View product storefront"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/seller/add-product?editId=${p.id}`}
                            className="p-1.5 text-slate-450 hover:text-amber-600 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-md transition-colors"
                            title="Edit product details"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 text-slate-450 hover:text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-md transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <FiBox className="w-12 h-12 text-slate-300" />
                      <h4 className="font-heading font-bold text-slate-700 dark:text-slate-300">No products found</h4>
                      <p className="text-xs text-slate-400 max-w-xs">You haven't listed any products yet. Click "Add New Product" to start selling.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </SellerLayout>
  );
}
