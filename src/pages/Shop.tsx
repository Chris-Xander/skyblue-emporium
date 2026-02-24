import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilter from '@/components/products/CategoryFilter';
import { useProductsFiltered } from '@/hooks/useProducts';
import { Search, Loader } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || undefined;
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryParam === 'all' ? undefined : categoryParam
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const newCategory = categoryParam === 'all' ? undefined : categoryParam;
    setSelectedCategory(newCategory);
  }, [categoryParam]);

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId === 'all' ? undefined : categoryId;
    setSelectedCategory(newCategory);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const { data: products = [], isLoading, error } = useProductsFiltered(selectedCategory, searchQuery);

  const filteredProducts = products;

  return (
    <Layout>
      <div className="container-shop py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shop All Products
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of quality products
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Error loading products
            </h3>
            <p className="text-muted-foreground">
              Please try again later
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
