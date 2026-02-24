# Deployment Checklist

## ✅ Pre-Deployment Verification

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run test` - All tests pass
- [ ] Run `npm run build` - Build succeeds
- [ ] Check `npm run preview` - Production build works

### Firebase Setup
- [ ] Firebase project created: `vienelleshop-12842`
- [ ] Firestore database created
- [ ] Database region: `europe-west1`
- [ ] Collections created: `categories`, `products`, `orders`
- [ ] Sample data seeded (12 products, 4 categories)
- [ ] Firebase config credentials verified

### Security Rules
- [ ] Read rules allow public access to products/categories
- [ ] Write rules restrict orders/admin data appropriately
- [ ] Consider enabling backup rules
- [ ] Test rules with actual data operations

### Testing
- [ ] ✅ Home page loads featured products
- [ ] ✅ Shop page filters by category
- [ ] ✅ Search functionality works
- [ ] ✅ Product details display correctly
- [ ] ✅ Add to cart works (localStorage)
- [ ] ✅ Checkout creates order in Firestore
- [ ] ✅ Order confirmation loads from Firestore
- [ ] ✅ Admin dashboard shows correct stats
- [ ] ✅ No console errors in dev tools

---

## 🚀 Deployment Steps

### Step 1: Build for Production
```bash
npm run build
```
✅ Ensures no TypeScript errors
✅ Minifies and optimizes code
✅ Creates production bundle

### Step 2: Deploy Frontend
Choose one:

**Option A: Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

**Option B: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option C: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Step 3: Configure Production Firestore Rules
Update rules in Firebase Console:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to products and categories
    match /products/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /categories/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Orders - anyone can create, owner can read
    match /orders/{orderId} {
      allow create: if true;
      allow read: if isAdmin() || request.auth.uid != null;
      allow write: if isAdmin();
    }
    
    // Helper function
    function isAdmin() {
      return request.auth.uid != null &&
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### Step 4: Setup Admin Users (if using Auth)
1. Create admin user in Firebase Console
2. Set admin flag in custom claims or admin collection
3. Test admin access to dashboard

### Step 5: Configure Environment Variables
For production, set these in your deployment platform:
```
VITE_FIREBASE_API_KEY=AIzaSyAXYBLruGm_pr_dyAZbxAo6vX_Sm6oGVpA
VITE_FIREBASE_PROJECT_ID=vienelleshop-12842
```

### Step 6: Monitor Post-Deployment
- [ ] Check uptime/availability
- [ ] Monitor error logs
- [ ] Verify Firestore data loads
- [ ] Test complete user workflow
- [ ] Check mobile responsiveness

---

## 📊 Post-Deployment Monitoring

### Firebase Console
- Check Firestore usage metrics
- Monitor read/write operations
- Review performance metrics
- Set up alerts for quota limits

### Application Monitoring
- Check browser console for errors
- Monitor network requests
- Track user interactions
- Set up error reporting (Sentry, etc.)

### Performance
- Measure page load time
- Check API response times
- Monitor Firestore latency
- Optimize slow queries

---

## 🔒 Security Checklist

- [ ] Firebase config only has necessary permissions
- [ ] API keys restricted in Firebase Console
- [ ] Firestore rules block unauthorized writes
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled on all endpoints
- [ ] CORS configured properly
- [ ] Rate limiting considered for orders
- [ ] Input validation on server (if applicable)

---

## 📝 Documentation for Users

- [ ] Deployment URL documented
- [ ] Known issues listed
- [ ] Contact/support information provided
- [ ] Terms of service updated
- [ ] Privacy policy matches data collection

---

## 🔧 Optional Enhancements Before Deploy

### Already Included
- ✅ Firestore backend
- ✅ React Query caching
- ✅ TypeScript safety
- ✅ Loading states
- ✅ Error handling

### Recommended Before Production
- [ ] Add Firebase Authentication
- [ ] Implement image upload to Firebase Storage
- [ ] Setup email notifications (EmailJS)
- [ ] Add analytics tracking
- [ ] Implement payment processing
- [ ] Add order status updates
- [ ] Setup admin panel for product management
- [ ] Add user account system
- [ ] Implement product reviews
- [ ] Setup search indexing (Algolia/Meilisearch)

### Can Wait for Phase 2
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] Recommendation engine
- [ ] Social media integration
- [ ] Mobile app version
- [ ] Multi-language support

---

## 🧪 Final Testing Checklist

### Functional Testing
- [ ] Create account → Add to cart → Checkout → Order confirmation
- [ ] Search products by name
- [ ] Filter products by category
- [ ] View product details
- [ ] Check order appears in Firestore
- [ ] Admin dashboard shows correct stats

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Testing
- [ ] Initial load time < 3 seconds
- [ ] Page transitions smooth
- [ ] No janky animations
- [ ] Firestore queries complete quickly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Mobile touch targets adequate

---

## 📞 Rollback Plan

If issues occur post-deployment:

1. **Immediate**: Revert to previous deployment
2. **Investigation**: Check error logs
3. **Fix**: Deploy patch
4. **Verification**: Test thoroughly

Rollback commands:
```bash
# Firebase Hosting
firebase hosting:channels:list
firebase hosting:clone production staging

# Vercel
vercel rollback

# Netlify
netlify deploy --prod --dir=dist
```

---

## ✨ Success Criteria

After deployment, verify:
- ✅ Website loads without errors
- ✅ Products load from Firestore
- ✅ Orders save to Firestore
- ✅ Admin dashboard shows real data
- ✅ No console errors
- ✅ Page loads in < 3 seconds
- ✅ All forms work correctly
- ✅ Search and filter functional

---

## 📅 Timeline Estimate

| Phase | Duration |
|-------|----------|
| Code review | 1 hour |
| Testing | 2 hours |
| Deployment | 30 minutes |
| Verification | 1 hour |
| **Total** | **4.5 hours** |

---

## 👥 Stakeholder Notifications

- [ ] Notify team members
- [ ] Prepare announcement
- [ ] Document known issues
- [ ] Setup customer support process
- [ ] Create feedback collection method

---

## 📋 Post-Launch Tasks

- [ ] Monitor for first 24 hours
- [ ] Gather user feedback
- [ ] Fix critical bugs immediately
- [ ] Plan Phase 2 enhancements
- [ ] Schedule retrospective meeting

---

**Deployment Date**: [INSERT DATE]
**Deployed By**: [INSERT NAME]
**Status**: Ready for Deployment ✅

All systems go! 🚀
