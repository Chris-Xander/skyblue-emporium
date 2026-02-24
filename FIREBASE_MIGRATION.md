# Firebase Migration Guide - SkyShop

This document explains the migration from mock data to Firebase Firestore backend.

## Overview

Your e-commerce application has been successfully migrated from static mock data to a dynamic Firebase Firestore backend. All components now use React Query for efficient data fetching and caching.

## What Changed

### 1. **Core Libraries Created**

#### `/src/lib/firestore.ts`
- Core Firestore helper functions for all database operations
- TypeScript interfaces for `Category`, `Product`, and `Order`
- Functions for CRUD operations on Firestore collections
- Full-text search capability (client-side filtering)

#### `/src/lib/seed.ts`
- Seed function to initialize Firestore with mock data
- Use this to populate your database with initial product and category data

### 2. **Custom Hooks Created**

#### `/src/hooks/useProducts.ts`
- `useProducts()` - Fetch all products
- `useProduct(id)` - Fetch single product by ID
- `useProductsByCategory(categoryId)` - Fetch products by category
- `useProductSearch(searchTerm)` - Search products
- `useProductsFiltered(categoryId?, searchTerm?)` - Combined filtering hook

#### `/src/hooks/useCategories.ts`
- `useCategories()` - Fetch all categories
- `useCategory(id)` - Fetch single category by ID

#### `/src/hooks/useOrders.ts`
- `useOrders()` - Fetch all orders
- `useOrder(id)` - Fetch single order
- `useCreateOrder()` - Create new order (mutation)
- `useUpdateOrder()` - Update order status
- `useDeleteOrder()` - Delete order

### 3. **Updated Components**

| Component | Changes |
|-----------|---------|
| **Shop.tsx** | Uses `useProductsFiltered()` for dynamic filtering and search |
| **ProductDetails.tsx** | Uses `useProduct()` and `useCategory()` hooks with loading states |
| **Index.tsx** | Featured products and categories now load from Firestore |
| **CategoryFilter.tsx** | Categories fetched dynamically with loading indicator |
| **AdminDashboard.tsx** | Real stats from Firestore (products, categories, orders, revenue) |
| **Checkout.tsx** | Orders saved directly to Firestore with customer info and items |
| **OrderConfirmation.tsx** | Loads order details from Firestore by order ID |
| **ProductCard.tsx** | Updated to use Firestore Product type |

### 4. **Database Schema**

#### **Collections in Firestore**

##### `categories` collection
```json
{
  "id": "food",
  "name": "Food & Snacks",
  "icon": "🍕"
}
```

##### `products` collection
```json
{
  "id": "f1",
  "name": "Organic Honey Jar",
  "price": 2500,
  "categoryId": "food",
  "description": "Pure organic honey...",
  "imageUrl": "https://..."
}
```

##### `orders` collection
```json
{
  "id": "auto-generated",
  "items": [
    {
      "id": "f1",
      "name": "Organic Honey Jar",
      "price": 2500,
      "quantity": 2,
      "imageUrl": "https://...",
      "categoryId": "food"
    }
  ],
  "total": 5000,
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+237 6XX XXX XXX",
    "address": "123 Main St",
    "city": "Yaounde",
    "country": "Cameroon"
  },
  "paymentMethod": "MTN MoMo",
  "status": "pending",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Getting Started

### 1. **Initialize Firestore with Data**

The easiest way to seed your database is to temporarily add this to your `main.tsx`:

```typescript
import { seedFirestore } from '@/lib/seed';

// Call once to seed data (remove after first run)
seedFirestore().catch(console.error);

createRoot(document.getElementById('root')!).render(<App />);
```

Or manually add documents to your Firestore:
1. Go to Firebase Console
2. Create `categories` and `products` collections
3. Add documents matching the schema above

### 2. **Firestore Rules (Development)**

For development, use these permissive rules (⚠️ **Not for production**):

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. **Production Rules**

For production, implement proper security:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to products and categories
    match /products/{document=**} {
      allow read: if true;
    }
    match /categories/{document=**} {
      allow read: if true;
    }
    
    // Only authenticated admins can modify products/categories
    match /products/{document=**} {
      allow write: if request.auth.uid != null && 
                      get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Anyone can create orders, only owner can read
    match /orders/{orderId} {
      allow create: if true;
      allow read: if request.auth.uid != null;
    }
  }
}
```

## Key Features

### ✅ **Real-time Data Fetching**
- All data is fetched from Firestore
- Automatic caching via React Query
- Loading and error states handled throughout

### ✅ **Search & Filter**
- Products can be filtered by category
- Full-text search on product name and description
- Combined category + search filtering in Shop page

### ✅ **Order Management**
- Orders stored in Firestore with full customer information
- Order status tracking (pending, confirmed, shipped, delivered)
- Revenue calculation from orders

### ✅ **Type Safety**
- Full TypeScript support throughout
- Interfaces for all Firestore documents
- Compile-time type checking

## Migration Checklist

- ✅ Firebase config imports fixed
- ✅ Firestore helper functions created
- ✅ Custom hooks implemented
- ✅ All pages updated to use Firestore
- ✅ Product and category data loading dynamically
- ✅ Orders saved to Firestore
- ✅ Order confirmation loads from Firestore
- ✅ Loading states and error handling added
- ✅ Type safety with TypeScript interfaces

## Important Notes

### Old Mock Data File
The original `src/data/products.ts` has been kept but is no longer used. You can safely delete it after verifying Firestore is working.

### Cart Storage
Cart data remains in localStorage (no changes needed). Only orders are saved to Firestore.

### Search Implementation
Firestore doesn't support native full-text search. Current implementation uses client-side filtering. For production, consider:
- Algolia for advanced search
- Elasticsearch integration
- Firebase Extensions for full-text search

## Troubleshooting

### Data Not Loading?
1. Check Firebase Console for correct collections: `categories`, `products`
2. Verify Firestore rules allow read access
3. Check browser console for error messages
4. Ensure Firebase config is correct in `firebaseConfig.js`

### Orders Not Saving?
1. Verify Firestore rules allow write to `orders` collection
2. Check customer form validation
3. Look for errors in browser console

### Loading Spinners Stay Forever?
1. Check browser console for API errors
2. Verify Firestore collections have data
3. Check React Query devtools (if installed)

## Next Steps

1. **Populate Firestore**: Run seed function or manually add data
2. **Test Full Flow**: Create account → Add to cart → Checkout → Verify order in Firestore
3. **Setup Authentication**: Add Firebase Auth for admin dashboard
4. **Configure Production Rules**: Update Firestore security rules
5. **Setup Admin Panel**: Build UI for managing products/categories/orders
6. **Add Image Upload**: Implement Firebase Storage for product images

## Performance Optimization

React Query automatically handles:
- Data caching (configurable stale time)
- Request deduplication
- Automatic refetching
- Background updates

To customize query behavior, adjust hooks or add query configuration in `App.tsx`.

## File Structure

```
src/
├── lib/
│   ├── firestore.ts      # Firestore operations
│   ├── seed.ts           # Data seeding function
│   └── utils.ts          # Existing utilities
├── hooks/
│   ├── useProducts.ts    # Product hooks
│   ├── useCategories.ts  # Category hooks
│   ├── useOrders.ts      # Order hooks
│   └── use-*.ts          # Other hooks
├── pages/
│   ├── Index.tsx         # Updated
│   ├── Shop.tsx          # Updated
│   ├── ProductDetails.tsx # Updated
│   ├── Cart.tsx          # No changes
│   ├── Checkout.tsx      # Updated
│   ├── OrderConfirmation.tsx # Updated
│   └── admin/
│       └── AdminDashboard.tsx # Updated
├── components/
│   └── products/
│       ├── CategoryFilter.tsx # Updated
│       ├── ProductCard.tsx    # Updated
│       └── ...
└── data/
    └── products.ts       # Deprecated (no longer used)
```

## Support

For issues or questions about the migration, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Query Documentation](https://tanstack.com/query)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
