import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiCalendar, FiArrowLeft, FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { productService } from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { AuthContext } from '../../context/AuthContext';
import Rating from '../../components/common/Rating';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ProductCard from '../../components/product/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [quantity, setQuantity] = useState(1);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const prod = await productService.getProductById(id);
        setProduct(prod);
        setQuantity(1); // Reset qty on product change

        // Fetch related products (same category, excluding current)
        const allInCat = await productService.getProducts({ category: prod.category });
        setRelatedProducts(allInCat.filter((p) => p.id !== prod.id).slice(0, 4));
      } catch (err) {
        toast.error('Product not found.');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SkeletonLoader type="product-details" />
      </div>
    );
  }

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const activePrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;

  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
      toast.info('Removed from Wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to Wishlist');
    }
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to Cart!`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) {
      toast.error('Please write a review comment');
      return;
    }
    setSubmittingReview(true);
    try {
      const updatedProduct = await productService.addReview(product.id, {
        user: user ? user.name : 'Anonymous Buyer',
        rating: newReviewRating,
        comment: newReviewComment.trim(),
      });
      setProduct(updatedProduct);
      setNewReviewComment('');
      setNewReviewRating(5);
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 text-left">
      
      {/* Back link */}
      <Link to="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        <FiArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Main product summary block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Images gallery */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-4 overflow-hidden aspect-square flex items-center justify-center shadow-xs">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain max-h-[450px]"
          />
        </div>

        {/* Product specs details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase rounded-lg tracking-wider">
              {product.category}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400">Sold by <span className="font-semibold text-slate-700 dark:text-slate-300">{product.sellerName}</span></p>
          </div>

          <Rating value={product.rating} text={`${product.rating} ★ (${product.reviewCount} customer reviews)`} />

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              ${activePrice.toFixed(2)}
            </span>
            {originalPrice && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-rose-500">
                  ({Math.round(((originalPrice - activePrice) / originalPrice) * 100)}% OFF)
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Stock alerts & selectors */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-500">Availability:</span>
              <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-500">Quantity:</span>
                <div className="flex items-center border border-slate-200 dark:border-slate-750 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-slate-800 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              variant="primary"
              size="lg"
              icon={FiShoppingCart}
              className="flex-1 min-w-[200px]"
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            <button
              onClick={handleWishlistToggle}
              className={`
                px-5 py-3 border border-slate-250 dark:border-slate-700 rounded-xl flex items-center justify-center transition-all cursor-pointer
                ${isLiked 
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-750'
                }
              `}
              title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isLiked ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </section>

      {/* Reviews section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-slate-200 dark:border-slate-800 pt-12">
        
        {/* Left column reviews summary */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-heading font-extrabold text-xl text-slate-905 dark:text-white">Customer Reviews</h3>
          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{product.rating}</span>
            <Rating value={product.rating} />
            <span className="text-xs text-slate-450 mt-1">{product.reviewCount} customer reviews</span>
          </div>

          {/* Add review form */}
          <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Write a Review</h4>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <FiStar className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col">
              <textarea
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={3}
                className="px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 outline-hidden"
              />
            </div>

            <Button type="submit" isLoading={submittingReview} className="w-full">
              Submit Review
            </Button>
          </form>
        </div>

        {/* Right column reviews list */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-bold text-base text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
            Recent Feedback ({product.reviews?.length || 0})
          </h4>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 dark:bg-slate-900 text-slate-400 rounded-full flex items-center justify-center font-bold text-xs">
                        <FiUser className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">{rev.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1"><FiCalendar /> {rev.date}</span>
                  </div>
                  <Rating value={rev.rating} />
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-xl">
              No reviews for this product yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

      </section>

      {/* Related products grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
          <div>
            <h3 className="font-heading font-extrabold text-xl text-slate-905 dark:text-white">Related Products</h3>
            <p className="text-xs text-slate-400 mt-1">Check out other items in the {product.category} category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
