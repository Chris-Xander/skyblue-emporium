# Admin Dashboard - Quick Reference

## 🚀 Quick Start

### Admin Login
1. Go to `/admin`
2. Enter any username/password (demo mode)
3. Click "Login"

### Dashboard Features
- **Stats** - Real-time product, category, order, and revenue counts
- **Add Product** - Create new products with images and descriptions
- **Add Category** - Create new categories with emoji icons
- **Recent Products** - Table showing latest 5 products

---

## 📦 Add Product Modal

### Form Fields
| Field | Type | Example |
|-------|------|---------|
| Product Name | Text | "Organic Honey Jar" |
| Price (XAF) | Number | "2500" |
| Category | Dropdown | "Food & Snacks 🍕" |
| Description | Textarea | "Pure organic honey..." |
| Quantity | Number | "50" |
| Image | Upload | [JPG/PNG file] |

### Validation Rules
- ✓ All fields required
- ✓ Price must be > 0
- ✓ Quantity must be ≥ 0
- ✓ Image must be JPG/PNG under 5MB

### Data Saved To
→ Firestore `products` collection

---

## 📂 Add Category Modal

### Form Fields
| Field | Type | Example |
|-------|------|---------|
| Category Name | Text | "Electronics" |
| Icon | Emoji Button | 🍕👕👜💎 |

### Available Icons
🍕 👕 👜 💎 👗 👞 ⌚ 🎒 👒 🧣 👜 💍 🎁 📦 🛍️

### Validation Rules
- ✓ Name must be 2+ characters
- ✓ Emoji must be selected

### Data Saved To
→ Firestore `categories` collection

---

## 🔄 Real-Time Updates

When you add product/category:
1. Form validates instantly
2. Data saves to Firestore
3. Dashboard stats update
4. Product/Category list refreshes
5. Modal closes automatically
6. Success notification shows
7. Available in shop immediately

---

## ⚠️ Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Please fill in all fields" | Missing required field | Check all fields have values |
| "Image must be < 5MB" | Image too large | Compress image, try smaller file |
| Failed to add | Network/Firestore error | Check internet, try again |
| Product not appearing | Firestore sync delay | Refresh page after 2 seconds |

---

## 🎯 Tips & Tricks

1. **Product Images**
   - Use images at least 400x400px
   - Keep under 500KB for performance
   - JPG format is smaller than PNG

2. **Category Names**
   - Keep short and clear
   - Avoid duplicate names
   - Use intuitive names

3. **Product Descriptions**
   - Be detailed and descriptive
   - Mention key features
   - Keep under 500 characters

4. **Pricing**
   - Double-check before submitting
   - Use realistic prices
   - All in XAF currency

---

## 📊 Dashboard Stats

Shows real-time counts:
- **Total Products** - All products in store
- **Categories** - All active categories
- **Total Orders** - All customer orders
- **Revenue** - Sum of all order totals

---

## 🔐 Firestore Collections

### Products
```
{
  name: string
  price: number
  categoryId: string
  description: string
  imageUrl: string (base64)
}
```

### Categories
```
{
  name: string
  icon: string (emoji)
}
```

### Orders
```
{
  items: array
  total: number
  customerInfo: object
  status: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## 🔗 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ESC | Close modal |
| TAB | Navigate fields |
| ENTER | Submit form |

---

## 🧪 Test Flow

1. Click **"Add Category"** → Add "Electronics 💻"
2. Click **"Add Product"**
   - Name: "Laptop Pro"
   - Price: 150000
   - Category: Electronics 💻
   - Description: "High performance laptop"
   - Quantity: 10
   - Upload an image
3. Click **"Add Product"** → Submit
4. Check stats updated
5. Go to Shop page
6. See new product in store
7. Filter by Electronics category
8. See your new product

---

## 📱 Responsive Design

✓ Works on desktop
✓ Works on tablet
✓ Works on mobile (portrait & landscape)
✓ Touch-friendly buttons
✓ Mobile-optimized modals

---

## 🆘 Need Help?

### Check These Files
- `ADMIN_FEATURES_GUIDE.md` - Complete user guide
- `ADMIN_IMPLEMENTATION.md` - Technical details
- Browser console (F12) - Error messages

### Common Issues
- **Modal not opening?** - Verify logged in
- **Image not uploading?** - Check file format/size
- **Product not saving?** - Check internet connection
- **Stats not updating?** - Refresh page

---

## 🎨 UI Components Used

- **Dialog** - Modal container
- **Button** - Submit/Cancel buttons
- **Input** - Text/Number inputs
- **Textarea** - Description field
- **Select** - Category dropdown
- **Toast** - Notifications
- **Icons** - Lucide React icons

---

## 📈 Next Phase Features

- [ ] Edit existing products
- [ ] Delete products/categories
- [ ] Firebase Storage for images
- [ ] Product search
- [ ] Bulk import
- [ ] Analytics dashboard

---

## 📞 Support Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [React Query Docs](https://tanstack.com/query)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Admin Dashboard v1.0** ✅
Ready for production use!

Last Updated: January 26, 2026
