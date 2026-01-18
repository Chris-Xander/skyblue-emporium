import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getProductById, getCategoryById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = id ? getProductById(id) : null;
  const category = product ? getCategoryById(product.categoryId) : null;

  if (!product) {
    return (
      <Layout>
        <div className="container-shop py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      });
    }
    toast.success(`${quantity} × ${product.name} added to cart!`);
  };

  return (
    <Layout>
      <div className="container-shop py-8 md:py-12">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {category && (
              <span className="badge-category w-fit mb-4">
                {category.icon} {category.name}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full md:w-auto gap-2 font-semibold"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - {formatPrice(product.price * quantity)}
            </Button>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">✓</span>
                <span>Fast delivery available</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">✓</span>
                <span>Pay with MTN MoMo</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">✓</span>
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
