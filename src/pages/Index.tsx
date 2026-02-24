import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, CreditCard, Headphones, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

export default function Index() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
        <div className="container-shop relative py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Quality Products,
              <br />
              Delivered to You
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Discover our curated collection of food, clothing, bags, and jewelry. 
              Shop with confidence and pay easily with MTN MoMo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" variant="secondary" className="gap-2 font-semibold shadow-lg">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container-shop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick shipping' },
              { icon: Shield, title: 'Secure', desc: 'Safe shopping' },
              { icon: CreditCard, title: 'MTN MoMo', desc: 'Easy payment' },
              { icon: Headphones, title: 'Support', desc: '24/7 help' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container-shop">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse our diverse collection across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoriesLoading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <Loader className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              categories.map((category, i) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-product transition-all duration-300 text-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-4xl md:text-5xl mb-4 block">{category.icon}</span>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container-shop">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">Hand-picked just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productsLoading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <Loader className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container-shop">
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Shop?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-lg mx-auto">
              Join thousands of happy customers who shop with us. 
              Easy ordering, secure payment with MTN MoMo.
            </p>
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="font-semibold shadow-lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
