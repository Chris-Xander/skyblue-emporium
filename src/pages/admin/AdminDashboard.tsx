import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, 
  FolderOpen, 
  ShoppingBag, 
  LogOut, 
  Plus,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth !== 'true') {
      navigate('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Pending Orders',
      value: 0,
      icon: ShoppingBag,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      label: 'Revenue',
      value: 'XAF 0',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-shop flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">SkyShop Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container-shop py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Products
            </h2>
            <p className="text-muted-foreground mb-4">
              Manage your product catalog. Add, edit, or remove products.
            </p>
            <div className="flex gap-3">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
              <Button variant="outline">View All</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Categories
            </h2>
            <p className="text-muted-foreground mb-4">
              Organize your products into categories for easy browsing.
            </p>
            <div className="flex gap-3">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
              <Button variant="outline">View All</Button>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Products
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map(product => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <tr key={product.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-foreground">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge-category">
                          {category?.icon} {category?.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary">
                        {new Intl.NumberFormat('fr-CM', {
                          style: 'currency',
                          currency: 'XAF',
                          minimumFractionDigits: 0,
                        }).format(product.price)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Setup Notice */}
        <div className="mt-8 bg-primary/5 rounded-xl border border-primary/20 p-6">
          <h3 className="font-bold text-foreground mb-2">🚀 Ready for Full Setup</h3>
          <p className="text-muted-foreground">
            This dashboard is using demo data. To enable full functionality with Firebase 
            (real-time database, authentication, image uploads, and email notifications), 
            you'll need to configure Firebase and EmailJS credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
