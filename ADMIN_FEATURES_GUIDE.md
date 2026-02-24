# Admin Dashboard - Product & Category Management Guide

## Overview

The admin dashboard now includes fully functional modals for adding new products and categories directly to Firestore. These features allow administrators to manage the store inventory without writing any code.

## Features Added

### 1. Add Product Modal
Click the "Add Product" button in the Products section to open a form for creating new products.

#### Product Form Fields:
- **Product Name** (required) - The name of the product
- **Price** (required) - Price in XAF currency
- **Category** (required) - Select from existing categories
- **Description** (required) - Detailed product description
- **Quantity Available** (required) - Stock quantity
- **Product Image** (required) - Upload image from device (JPG, PNG, up to 5MB)

#### Image Upload:
- Click the upload area or drag and drop an image
- Image is displayed as base64 (stored directly in Firestore)
- Remove and re-upload if needed
- Supported formats: JPG, PNG
- Maximum size: 5MB

#### Validation:
- All fields are required
- Price must be a positive number
- Quantity must be a non-negative number
- Image must be a valid image file under 5MB

#### Data Storage:
When you click "Add Product", the system:
1. Validates all form fields
2. Stores the product in Firestore `products` collection
3. Includes product image as base64 data URL
4. Updates the products list automatically
5. Shows success/error notification

### 2. Add Category Modal
Click the "Add Category" button in the Categories section to add a new product category.

#### Category Form Fields:
- **Category Name** (required) - Name of the category
- **Icon Selection** (required) - Choose from 15 emoji options

#### Available Emoji Options:
🍕 🎒 👕 👜 💎 👗 👞 ⌚ 🎒 👒 🧣 👜 💍 🎁 📦 🛍️

#### Visual Preview:
The form shows a live preview of how the category will appear with the selected emoji and name.

#### Validation:
- Category name must be at least 2 characters
- An emoji icon must be selected

#### Data Storage:
When you click "Add Category", the system:
1. Validates form fields
2. Stores the category in Firestore `categories` collection
3. Updates the categories list automatically
4. Makes it immediately available for new products
5. Shows success/error notification

## Firestore Collections

### Products Collection
Each product document contains:
```json
{
  "name": "Organic Honey Jar",
  "price": 2500,
  "categoryId": "food",
  "description": "Pure organic honey sourced from local farms...",
  "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

### Categories Collection
Each category document contains:
```json
{
  "name": "Food & Snacks",
  "icon": "🍕"
}
```

## How to Use

### Adding a Product

1. **Navigate to Admin Dashboard**
   - Go to `/admin` and login
   - Click "View Store" → Navigate to admin section

2. **Click "Add Product" Button**
   - Found in the Products section
   - Opens the Add Product modal

3. **Fill in Product Details**
   - Enter product name
   - Enter price in XAF
   - Select a category from dropdown
   - Write detailed description
   - Enter quantity available
   - Upload product image

4. **Upload Product Image**
   - Click the upload area
   - Select an image from your device
   - Image preview will appear
   - Can click X to remove and upload different image

5. **Submit the Form**
   - Click "Add Product" button
   - Wait for success notification
   - Modal will close and list will refresh
   - New product immediately appears in store

### Adding a Category

1. **Click "Add Category" Button**
   - Found in the Categories section
   - Opens the Add Category modal

2. **Enter Category Name**
   - Type the category name (e.g., "Electronics")
   - Name must be at least 2 characters

3. **Select an Emoji Icon**
   - Click any of the 15 emoji options
   - Selected emoji shows with blue border
   - Preview shows how category will look

4. **Submit the Form**
   - Click "Add Category" button
   - Wait for success notification
   - Modal will close and list will refresh
   - New category available for new products

## Error Handling

### Product Addition Errors

**"Please fill in all fields correctly"**
- One or more required fields are empty or invalid
- Check error messages in red text below each field
- Common issues:
  - Price must be a number > 0
  - Quantity must be a number ≥ 0
  - Image file is missing

**"Image must be less than 5MB"**
- Selected image is too large
- Compress the image before uploading
- Or select a different image

**"Failed to add product. Please try again."**
- Network or Firestore error
- Check browser console for details
- Verify Firestore write permissions
- Try again after a moment

### Category Addition Errors

**"Please fill in all fields correctly"**
- Category name is too short or empty
- No emoji icon was selected
- Enter a longer name (min 2 characters)
- Select an emoji from the options

**"Failed to add category. Please try again."**
- Network or Firestore error
- Check browser console for details
- Verify Firestore write permissions

## Real-time Updates

### Automatic Refresh
When you add a product or category:
- The admin dashboard stats update immediately
- The products/categories list refreshes
- No page reload needed
- Changes visible across all connected clients

### Propagation to Store
New products and categories:
- Appear in the Shop page after page refresh
- Available in category filters
- Shown in product search
- Visible to all customers (public read access)

## Limitations & Considerations

### Image Storage
- Images are stored as base64 strings directly in Firestore
- For production, consider using Firebase Storage instead
- Base64 approach is simpler but less optimal for large images
- Each image increases document size

### Category Icons
- Limited to 15 emoji options for consistency
- Can't upload custom icons currently
- Emojis display consistently across all browsers
- Future enhancement: add more emoji options

### Validation
- Client-side validation for better UX
- Server-side validation could be added
- Custom validation rules can be extended

## Advanced Features

### Extending the Add Product Modal
To add more fields:

1. **Update Firestore interface** in `src/lib/firestore.ts`
2. **Add form fields** to `src/components/admin/AddProductModal.tsx`
3. **Update validation logic** in handleSubmit
4. **Adjust the table display** in AdminDashboard

### Adding More Emoji Options
Edit `src/components/admin/AddCategoryModal.tsx`:
```tsx
const EMOJI_OPTIONS = ['🍕', '👕', '👜', '💎', ...]; // Add more emojis
```

### Storing Images in Firebase Storage
For production upgrade:
1. Use Firebase Storage instead of base64
2. Upload file directly to storage bucket
3. Store URL in Firestore
4. Benefits: better performance, scalability, bandwidth

## Tips & Best Practices

1. **Product Images**
   - Use high-quality images (at least 400x400px)
   - Keep file size under 500KB for faster uploads
   - Use consistent image dimensions
   - Support JPEG and PNG formats

2. **Product Descriptions**
   - Be detailed and descriptive
   - Include key features and benefits
   - Mention materials/ingredients if applicable
   - Keep it under 500 characters for display

3. **Pricing**
   - Always enter realistic prices
   - Prices are in XAF currency
   - Update prices when costs change
   - Consider bulk discounts if applicable

4. **Categories**
   - Keep category names short and clear
   - Don't create duplicate categories
   - Use intuitive category names
   - Organize related products together

5. **Quantity Management**
   - Keep track of actual inventory
   - Update quantities as stock changes
   - Consider adding low stock alerts (future feature)
   - Remove products when out of stock

## Keyboard Shortcuts

- **ESC** - Close modal without saving
- **Tab** - Navigate between form fields
- **Enter** - Submit form (if valid)

## Troubleshooting

### Modal Won't Open
- Verify you're logged in as admin
- Check browser console for errors
- Try refreshing the page

### Form Submission Fails
- Check all fields are filled correctly
- Verify image file is valid
- Check internet connection
- Check browser console for error details

### New Product/Category Doesn't Appear
- Wait a moment for Firestore to sync
- Refresh the admin dashboard
- Check browser developer tools network tab
- Verify Firestore rules allow writes

### Image Not Displaying
- Check image file format (must be JPG/PNG)
- Verify file size is under 5MB
- Try uploading a different image
- Check browser console for errors

## Next Steps

### Phase 2 Enhancements
- [ ] Edit existing products
- [ ] Delete products/categories
- [ ] Image upload to Firebase Storage
- [ ] Bulk product import (CSV)
- [ ] Product variants (sizes, colors)
- [ ] Inventory alerts
- [ ] Product search in admin panel

### Integration Options
- [ ] Email notifications on new products
- [ ] Product approval workflow
- [ ] Activity logging
- [ ] Inventory tracking
- [ ] Sales analytics

## Support

For issues with the admin features:
1. Check browser console (F12 → Console tab)
2. Review error messages carefully
3. Verify Firestore collections have data
4. Check Firestore security rules
5. Refer to Firebase documentation

---

**Version**: 1.0.0
**Last Updated**: January 26, 2026
**Status**: Production Ready ✅
