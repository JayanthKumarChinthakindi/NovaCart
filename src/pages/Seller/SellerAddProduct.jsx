import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../services/mockData';
import { AuthContext } from '../../context/AuthContext';
import SellerLayout from '../../components/layout/SellerLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';

export default function SellerAddProduct() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const editId = searchParams.get('editId');
  const isEditMode = !!editId;

  const [loadingProduct, setLoadingProduct] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: 'electronics',
      price: '',
      discountPrice: '',
      stock: '',
      image: '',
    }
  });

  // Pre-fill fields if we are editing
  useEffect(() => {
    const loadProductForEdit = async () => {
      if (!editId) return;
      setLoadingProduct(true);
      try {
        const prod = await productService.getProductById(editId);
        reset({
          name: prod.name,
          description: prod.description,
          category: prod.category,
          price: prod.price,
          discountPrice: prod.discountPrice || '',
          stock: prod.stock,
          image: prod.image,
        });
      } catch (err) {
        toast.error('Failed to load product details.');
        navigate('/seller/products');
      } finally {
        setLoadingProduct(false);
      }
    };
    loadProductForEdit();
  }, [editId, reset, navigate]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Auto-assign random unsplash placeholder image if not provided
      const defaultImages = {
        electronics: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        fashion: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
        home: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
        beauty: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
        sports: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
      };
      
      const payload = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
        stock: Number(data.stock),
        image: data.image.trim() || defaultImages[data.category] || defaultImages.electronics,
      };

      if (isEditMode) {
        await productService.updateProduct(editId, payload);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(payload, user.id, user.storeName);
        toast.success('Product listed successfully!');
      }
      navigate('/seller/products');
    } catch (err) {
      toast.error(err.message || 'Failed to save product listings.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <SellerLayout>
        <div className="space-y-4">
          <div className="h-8 bg-slate-205 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
          <div className="h-96 bg-slate-205 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      
      {/* Title */}
      <div className="flex items-center gap-2">
        <Link to="/seller/products" className="p-2 text-slate-450 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-none">
            {isEditMode ? 'Edit Product Details' : 'Add New Product Listing'}
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            Fill in the information below to {isEditMode ? 'update' : 'publish'} your product.
          </p>
        </div>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl text-left">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <Input
            label="Product Title"
            id="name"
            placeholder="e.g. AeroSound Pro Wireless Headphones"
            error={errors.name}
            {...register('name', { required: 'Product title is required' })}
          />

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1.5 text-sm font-medium text-slate-705 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Provide a comprehensive product description details..."
              rows={4}
              className="px-3.5 py-2.5 border text-sm rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 outline-hidden"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <span className="text-xs text-rose-500 mt-1">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
              <select
                id="category"
                className="px-3.5 py-2.5 border text-sm rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 outline-hidden capitalize"
                {...register('category', { required: true })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <Input
              label="Stock Quantity (units)"
              id="stock"
              type="number"
              placeholder="e.g. 50"
              error={errors.stock}
              {...register('stock', { 
                required: 'Stock count is required',
                min: { value: 0, message: 'Stock cannot be negative' }
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Regular Price ($)"
              id="price"
              type="number"
              step="0.01"
              placeholder="e.g. 199.99"
              error={errors.price}
              {...register('price', { 
                required: 'Regular price is required',
                min: { value: 0.01, message: 'Price must be greater than zero' }
              })}
            />
            
            <Input
              label="Discount Price ($) - Optional"
              id="discountPrice"
              type="number"
              step="0.01"
              placeholder="e.g. 159.99"
              error={errors.discountPrice}
              {...register('discountPrice', {
                min: { value: 0.01, message: 'Discount must be greater than zero' }
              })}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Product Image URL - Optional"
              id="image"
              placeholder="https://images.unsplash.com/..."
              error={errors.image}
              {...register('image')}
            />
            <p className="text-[10px] text-slate-400 leading-normal">
              💡 Leave blank to auto-generate a high-quality placeholder image matched to your selected product category.
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-2.5">
            <Link to="/seller/products">
              <Button variant="ghost" className="px-5 py-2.5">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              isLoading={submitting}
              icon={FiSave}
              className="px-6 py-2.5"
            >
              {isEditMode ? 'Update Product' : 'Publish Product'}
            </Button>
          </div>

        </form>
      </div>

    </SellerLayout>
  );
}
