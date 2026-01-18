import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Phone, Copy, Home } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OrderData {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const navigate = useNavigate();

  // MTN MoMo details (these would be configured by admin)
  const momoDetails = {
    number: '670000000',
    name: 'SkyShop Enterprise',
  };

  useEffect(() => {
    const stored = localStorage.getItem('pending_order');
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      navigate('/shop');
    }
  }, [navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (!order) {
    return (
      <Layout>
        <div className="container-shop py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-shop py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you, {order.customer.name}! Your order has been received.
            </p>
          </div>

          {/* Order ID */}
          <div className="bg-secondary rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Order Reference</p>
            <p className="text-xl font-bold text-foreground">{order.orderId}</p>
          </div>

          {/* MTN MoMo Payment Instructions */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Complete Your Payment
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pay via MTN Mobile Money
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">MoMo Number</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(momoDetails.number, 'MoMo number')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xl font-bold text-foreground">{momoDetails.number}</p>
              </div>

              <div className="bg-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                <p className="text-lg font-semibold text-foreground">{momoDetails.name}</p>
              </div>

              <div className="bg-card rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Amount to Pay</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(order.total.toString(), 'Amount')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
              </div>

              <div className="bg-card rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Reference (Order ID)</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(order.orderId, 'Reference')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-lg font-bold text-foreground">{order.orderId}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-100 rounded-lg">
              <p className="text-sm text-amber-800 font-medium">
                ⚠️ Please include your Order ID as reference when making the payment.
                Your order will be processed once payment is confirmed.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
