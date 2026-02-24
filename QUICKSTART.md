# Quick Start Guide - Firebase Backend

## 🚀 Get Started in 5 Minutes

### Step 1: Start the Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser

### Step 2: Initialize Firestore with Data

Add this to `src/main.tsx` **above** the `createRoot` line:

```typescript
import { seedFirestore } from '@/lib/seed';

// Initialize Firestore with sample data
seedFirestore().catch(console.error);

// Keep rest of the code...
createRoot(document.getElementById('root')!).render(<App />);
```

Save the file. Check the browser console - you should see:
```
Seeding Firestore with initial data...
✅ Firestore seeded successfully!
```

### Step 3: Remove Seed Code
Delete the seed code from `main.tsx` (it should only run once):

```typescript
// Remove these lines:
// import { seedFirestore } from '@/lib/seed';
// seedFirestore().catch(console.error);
```

### Step 4: Test the Application
- ✅ Home page shows featured products
- ✅ Shop page shows all products
- ✅ Filter by category works
- ✅ Search products works
- ✅ Product details load correctly
- ✅ Add to cart works (uses localStorage)
- ✅ Checkout creates order in Firestore
- ✅ Order confirmation shows order details

## 📊 Monitor Data in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select "vienelleshop-12842" project
3. Click "Firestore Database"
4. You should see three collections:
   - `categories` - 4 documents
   - `products` - 12 documents
   - `orders` - Orders you create during testing

## 🔧 Configuration

### Add More Categories
Edit `src/lib/seed.ts` and update `seedCategories` array

### Add More Products
Edit `src/lib/seed.ts` and update `seedProducts` array

### Change Firebase Project
Edit `src/config/firebaseConfig.js` with your Firebase credentials

## 📱 Full Workflow Test

1. **Visit Home Page** 
   - See featured products load
   - Click "Start Shopping"

2. **Browse Products**
   - See all 12 products
   - Filter by category
   - Search by name

3. **View Product Details**
   - Click product image
   - See full description
   - Add to cart

4. **Checkout**
   - Go to cart
   - Enter customer info:
     - Name: John Doe
     - Email: john@example.com
     - Phone: +237 690000000
     - Address: 123 Main St
     - City: Yaounde
   - Click "Confirm Order"

5. **Check Firestore**
   - Go to Firebase Console
   - Open Firestore > orders collection
   - See your order with all details

## 🐛 Troubleshooting

### Products not showing?
```bash
# 1. Check browser console for errors
# 2. Verify Firestore has data in Firebase Console
# 3. Check firebaseConfig.js has correct credentials
```

### Order not saving?
```bash
# 1. Fill all checkout form fields
# 2. Check browser console for errors
# 3. Verify Firestore security rules allow writes
```

### Seed function not working?
```bash
# Make sure you:
# 1. Import at top of main.tsx
# 2. Call before createRoot()
# 3. Check console for error messages
# 4. Remove seed code after first run
```

## 📚 Important Files

| File | Purpose |
|------|---------|
| `src/lib/firestore.ts` | Database operations |
| `src/lib/seed.ts` | Sample data initialization |
| `src/hooks/useProducts.ts` | Product queries |
| `src/hooks/useCategories.ts` | Category queries |
| `src/hooks/useOrders.ts` | Order operations |
| `FIREBASE_MIGRATION.md` | Full migration docs |
| `MIGRATION_COMPLETE.md` | What was done |

## 🎯 What Works Now

✅ Products load from Firestore
✅ Categories load from Firestore
✅ Filtering and search
✅ Product details
✅ Cart (localStorage)
✅ Checkout and order creation
✅ Order confirmation
✅ Admin dashboard stats
✅ Loading states
✅ Error handling

## ⚙️ Environment

- **Firebase Project**: vienelleshop-12842
- **Database**: Firestore (EU: europe-west1)
- **Storage**: Firestore free tier (1GB)
- **Auth**: Ready for Firebase Auth setup

## 🔒 Development Security Rules

Current rules allow all read/write (for development only).

For production, see `FIREBASE_MIGRATION.md` for proper security setup.

## 📞 Need Help?

1. Check `FIREBASE_MIGRATION.md` for detailed docs
2. Look at console for error messages
3. Visit [Firebase Console](https://console.firebase.google.com) to check data
4. Check [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

---

**You're all set!** 🎉

Your app is now powered by Firebase Firestore with full TypeScript support, automatic caching, and real-time data updates.
