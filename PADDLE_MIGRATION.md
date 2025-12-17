# Paddle Migration Roadmap

## Overview

Migration from Snipcart to Paddle for the Outline Online checkout system.

**Estimated Time:** 2-3 full working days (16-24 hours)

**Reference Implementation:** `/Users/ahmedghazi/Sites/overtype/www`

---

## Current State Analysis

### Snipcart Implementation
- Loaded via CDN (no npm package)
- Custom complex licensing system with 6 license types per product
- Products managed in React state before batch-adding to Snipcart
- Custom Snipcart templates for checkout UI
- Post-purchase webhook returns zip file URLs
- Snipcart handles cart UI and checkout flow

### Target Paddle Implementation
- npm packages: `@paddle/paddle-js` and `@paddle/paddle-node-sdk`
- Full cart UI built in React
- Cart state persisted to localStorage
- Non-catalog pricing (prices created dynamically per transaction)
- Complete post-purchase flow with Sanity integration and email delivery
- Custom checkout form with validation

---

## Migration Roadmap

### Phase 1: Infrastructure Setup (3-4 hours)

#### ☐ Step 1: Remove Snipcart Dependencies
**Files to modify:**
- `/web/app/layout.tsx` (Lines 41-52) - Remove Snipcart script initialization
- Remove body class `snipcart-overwrite`
- Remove `process.env.NEXT_PUBLIC_SNIPCART_API_KEY` references

**Files to delete:**
- `/web/public/snipcart-templates.html`

#### ☐ Step 2: Install Paddle Dependencies
**Commands:**
```bash
npm install @paddle/paddle-js @paddle/paddle-node-sdk
```

**Required packages:**
- `@paddle/paddle-js`: ^1.4.1 (client-side)
- `@paddle/paddle-node-sdk`: ^2.7.1 (server-side)

#### ☐ Step 3: Set Up Environment Variables
**Add to `.env.local`:**
```env
# Paddle Configuration
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
NEXT_PUBLIC_PADDLE_PUBLIC_KEY=test_your_key_here
PADDLE_SECRET_KEY=pdl_sdbx_apikey_your_key_here
PADDLE_WEBHOOK_SECRET=your_webhook_secret_here
```

**Get keys from:**
- Paddle Dashboard: https://sandbox-vendors.paddle.com/
- Create Sandbox account if needed
- Note: Start with sandbox, switch to production later

---

### Phase 2: Core Components (6-8 hours)

#### ☐ Step 4: Create PaddleProvider Component
**New file:** `/web/app/components/shop/Paddle/PaddleProvider.tsx`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/Paddle/PaddleProvider.tsx`

**Features needed:**
- Initialize Paddle with environment and public key
- Create Paddle context for app-wide access
- Event callback for `checkout.completed`
- Handle post-checkout processing (retrieve products from localStorage, call API)
- Error handling and loading states

**Key functions:**
- `initializePaddle()` - Setup Paddle instance
- `handleEvents()` - Listen for checkout events
- `processOrderCompleted()` - Post-purchase flow

#### ☐ Step 5: Update App Layout
**File:** `/web/app/layout.tsx`

**Changes:**
- Import and wrap app with `<PaddleProvider>`
- Remove Snipcart initialization script
- Keep existing ShopWrapper

**Provider hierarchy:**
```tsx
<ShopWrapper>
  <PaddleProvider>
    {children}
  </PaddleProvider>
</ShopWrapper>
```

#### ☐ Step 6: Update ShopContext
**File:** `/web/app/components/shop/ShopContext.tsx`

**Changes needed:**
- Remove Snipcart event listeners (Lines 227-271)
- Remove `window.Snipcart` TypeScript declarations
- Keep existing state management for products and licenses
- Add cart persistence to localStorage (key: `outline-cart`)
- Add reducer actions: `ADD`, `REMOVE`, `REMOVE_BY_SKU`, `REMOVE_ALL`, `REPLACE`

**New state to add:**
- `licenseOwner: { type: 'me' | 'client', companyName: string, email: string, website: string }`
- `termsAccepted: boolean`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/ShopContext.tsx` (Lines 1-228)

#### ☐ Step 7: Create Cart Component
**New file:** `/web/app/components/shop/Cart.tsx`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/Cart.tsx`

**Features needed:**
- Display all cart items using CartItem component
- Form sections:
  - License owner selection (me/client)
  - Company name input
  - Licensee website input
  - Email input
  - Terms acceptance checkbox
- Calculate and display total price (excl. VAT)
- Enable checkout only when all fields filled and terms accepted
- Empty cart state

**Form validation:**
- All fields required before checkout
- Email format validation
- Terms must be accepted

#### ☐ Step 8: Create CartItem Component
**New file:** `/web/app/components/shop/CartItem.tsx`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/CartItem.tsx`

**Display:**
- Product title
- License types selected (Desktop, Web, Logo, etc.)
- License size (company size)
- Price breakdown
- Delete button

**Actions:**
- Remove item from cart
- Update quantity (if applicable)

#### ☐ Step 9: Add Cart State Management
**File:** `/web/app/components/shop/ShopContext.tsx`

**Create reducers:**
```typescript
// Products in cart
const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET': return action.payload
    case 'ADD': return [...state, action.payload]
    case 'REMOVE': return state.filter((_, index) => index !== action.index)
    case 'REMOVE_BY_SKU': return state.filter(item => item.sku !== action.sku)
    case 'REPLACE': return state.map((item, index) =>
      index === action.index ? action.payload : item
    )
    case 'REMOVE_ALL': return []
    default: return state
  }
}
```

**LocalStorage sync:**
- Save cart to `outline-cart` on every change
- Load cart from localStorage on mount
- Add TTL if needed (5-minute expiry like reference)

#### ☐ Step 10: Update AddToCart Component
**File:** `/web/app/components/shop/AddToCart.tsx`

**Changes:**
- Remove Snipcart-specific data structure
- Update to add items to ShopContext cart state instead of Snipcart
- Keep existing license type selection logic
- Keep existing price calculation
- Change final action from `window.Snipcart.api.cart.items.add()` to `addToCart()` from context

**Preserve:**
- Custom fields logic (license types, sizes)
- Price calculation with discounts
- Product metadata structure

---

### Phase 3: Checkout Flow (5-7 hours)

#### ☐ Step 11: Create Checkout Component
**New file:** `/web/app/components/shop/Checkout.tsx`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/Checkout.tsx`

**Features:**
- Checkout button (disabled until form valid)
- Store products to localStorage with TTL (5 minutes)
- Map cart products to Paddle items format:
  ```typescript
  {
    quantity: 1,
    priceId: null, // Using non-catalog pricing
    price: {
      name: "Product name + license info",
      description: "SKU",
      unitPrice: {
        currencyCode: "EUR",
        amount: priceInCents
      },
      product: {
        name: "Product name",
        description: "Product description",
        taxCategory: "standard"
      },
      customData: {
        // License information
        // Product metadata
        // License owner information
      }
    }
  }
  ```
- Call `/api/checkout` to create transaction
- Open Paddle checkout overlay with:
  - `transactionId` from API
  - `customer.email` from form
  - `displayMode: "overlay"`
  - `theme: "dark"`
  - `successUrl: "/post-checkout?status=success"`

**Error handling:**
- Empty cart validation
- API call failures
- Paddle initialization errors

#### ☐ Step 12: Create Checkout API Route
**New file:** `/web/app/api/checkout/route.ts`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/api/checkout/route.ts`

**Endpoint:** POST `/api/checkout`

**Functionality:**
1. Initialize Paddle SDK with secret key
2. Validate incoming items array
3. Create Paddle transaction:
   ```typescript
   paddle.transactions.create({
     currencyCode: "EUR",
     items: items,
     customData: customData // License owner info
   })
   ```
4. Return transaction ID to client

**Environment:**
- Use sandbox/production based on `NEXT_PUBLIC_PADDLE_ENVIRONMENT`
- Secure secret key handling

#### ☐ Step 13: Create Order Completed API Route
**New file:** `/web/app/api/order-completed/route.ts`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/api/order-completed/route.ts`

**Endpoint:** POST `/api/order-completed`

**Functionality:**
1. Receive Paddle webhook data and stored products from localStorage
2. Verify webhook signature (using `PADDLE_WEBHOOK_SECRET`)
3. Extract order information from Paddle event
4. Query Sanity CMS for product zip files based on product IDs
5. Create/fetch user in Sanity (optional)
6. Create order document in Sanity with:
   - Order items with product details
   - Transaction ID, status, amounts
   - License owner information from customData
7. Fetch product ZIP files from Sanity
8. Send confirmation email with zip file attachments:
   - Customer email with download links/attachments
   - Admin notification email (optional)

**Email setup:**
- Use existing nodemailer configuration
- Attach zip files from Sanity
- Include order details and license information

**Error handling:**
- Invalid webhook signatures
- Missing products
- Sanity query failures
- Email delivery failures

#### ☐ Step 14: Update Product Data Mapping
**Files to review:**
- `/web/app/components/shop/AddToCart.tsx`
- `/web/app/components/shop/BuyModal.tsx`

**Mapping needed:**
- Current structure → Paddle item format
- Custom fields → Paddle customData
- License types → Price modifiers
- Discount logic → Final price calculation

**Key considerations:**
- Each license type selection should be reflected in the item name or customData
- Final price must be in smallest currency unit (cents for EUR)
- Product metadata must be preserved for order fulfillment

---

### Phase 4: UI Updates (2-3 hours)

#### ☐ Step 15: Update Cart Button Component
**File:** `/web/app/components/shop/Cart.tsx` (the button component, not the new cart view)

**Changes:**
- Remove `window.Snipcart.api.cart.open()` calls
- Replace with state-based cart drawer/modal toggle
- Keep item count display (from ShopContext)
- Update click handler to open new cart UI

**Options for cart display:**
- Modal overlay
- Slide-in drawer from right
- Dedicated cart page route

#### ☐ Step 16: Update BuyModal Component
**File:** `/web/app/components/shop/BuyModal.tsx`

**Changes:**
- Remove batch add to Snipcart (Lines 291-308)
- Update to add products to ShopContext cart
- Remove `window.Snipcart` TypeScript declarations
- Keep existing product selection logic
- Update success behavior (show cart or confirmation)

**Preserve:**
- Company size selector
- License type checkboxes
- Product list display
- Bundle and single selection

#### ☐ Step 17: Remove Snipcart-Specific Code
**Files to clean up:**
- `/web/app/components/shop/ShopContext.tsx` - Remove Snipcart event listeners
- `/web/app/components/shop/utils.ts` - Review for Snipcart dependencies
- `/web/app/styles/shop/_cart.scss` - Update for new cart UI
- `/web/app/styles/shop/_checkout.scss` - Update for Paddle checkout

**Delete:**
- `/web/public/snipcart-templates.html`
- Any Snipcart-specific utility functions

**Search and remove:**
```bash
# Find all Snipcart references
grep -r "Snipcart" web/app/
grep -r "snipcart" web/app/
```

#### ☐ Step 18: Style Cart and Checkout Components
**New/Updated files:**
- `/web/app/styles/components/shop/_cart.scss` - Cart component styling
- `/web/app/styles/components/shop/_cart-item.scss` - Cart item styling
- `/web/app/styles/components/shop/_checkout.scss` - Checkout button and form

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/styles/components/shop/_cart.scss`

**Key styling needs:**
- Cart overlay/drawer
- Cart item layout
- Form inputs (licensee name, website, email)
- Checkout button states
- Empty cart state
- Responsive design
- Dark theme support (if applicable)

---

### Phase 5: Testing & Launch (2-3 hours)

#### ☐ Step 19: Test Complete Checkout Flow in Sandbox
**Test scenarios:**
1. Add single product to cart with various license types
2. Add bundle to cart
3. Add multiple products
4. Remove items from cart
5. Update cart items
6. Fill checkout form with valid/invalid data
7. Complete Paddle checkout in sandbox
8. Verify webhook received and processed
9. Verify order created in Sanity
10. Verify email sent with zip files
11. Test empty cart scenarios
12. Test error scenarios (API failures, invalid data)

**Paddle test cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- More: https://developer.paddle.com/concepts/payment-methods/credit-debit-card

**Verification checklist:**
- [ ] Products add to cart correctly
- [ ] Cart persists on page refresh
- [ ] Price calculations accurate
- [ ] Form validation works
- [ ] Paddle overlay opens
- [ ] Checkout completes successfully
- [ ] Webhook processes order
- [ ] Email received with attachments
- [ ] Order visible in Sanity

#### ☐ Step 20: Create Post-Checkout Success Page
**New file:** `/web/app/post-checkout/page.tsx`

**Reference:** `/Users/ahmedghazi/Sites/overtype/www/web/app/components/shop/PostCheckout.tsx`

**Display:**
- Success message
- Order confirmation
- Download instructions
- Support contact
- Clear cart on mount

**Query params:**
- `status=success` or `status=error`
- Display appropriate message

#### ☐ Step 21: Configure Paddle Webhooks
**Paddle Dashboard:**
1. Go to Developer Tools → Webhooks
2. Add endpoint: `https://yourdomain.com/api/order-completed`
3. Select events:
   - `checkout.completed`
   - `transaction.completed` (optional)
   - `transaction.payment_failed` (optional for handling failures)
4. Copy webhook secret to environment variables

**Local testing:**
- Use ngrok or similar for local webhook testing
- Or use Paddle's webhook simulator

#### ☐ Step 22: Production Preparation
**Environment variables for production:**
```env
NEXT_PUBLIC_PADDLE_ENVIRONMENT=production
NEXT_PUBLIC_PADDLE_PUBLIC_KEY=live_your_key_here
PADDLE_SECRET_KEY=pdl_live_apikey_your_key_here
PADDLE_WEBHOOK_SECRET=your_webhook_secret_here
```

**Pre-launch checklist:**
- [ ] Switch to production Paddle account
- [ ] Update all environment variables
- [ ] Test production checkout with real payment method
- [ ] Verify webhook endpoint accessible
- [ ] Verify email delivery working
- [ ] Verify Sanity production instance connected
- [ ] Monitor first few transactions closely

**Rollback plan:**
- Keep Snipcart code in git history
- Document rollback steps if needed
- Monitor error rates closely for first week

---

## Key Differences: Snipcart vs Paddle

| Feature | Snipcart (Current) | Paddle (Target) |
|---------|-------------------|-----------------|
| **Cart UI** | Provided by Snipcart | Built custom in React |
| **Checkout UI** | Snipcart hosted | Paddle overlay (branded) |
| **Integration** | CDN script | npm packages |
| **Product Data** | Custom fields in Snipcart | customData in Paddle transaction |
| **State Management** | Batch add to Snipcart | React context + localStorage |
| **Post-Purchase** | Webhook returns data | Webhook triggers email + Sanity |
| **Pricing** | Catalog-based | Non-catalog (dynamic) |
| **Cart Persistence** | Snipcart handles | localStorage (custom) |

---

## Technical Architecture

### Data Flow

```
User selects product with licenses
         ↓
AddToCart adds to ShopContext
         ↓
Cart component displays items + form
         ↓
User fills licensee info + accepts terms
         ↓
Checkout button clicked
         ↓
Products stored to localStorage (5min TTL)
         ↓
POST /api/checkout → Create Paddle transaction
         ↓
Paddle overlay opens
         ↓
User completes payment
         ↓
Paddle fires checkout.completed event
         ↓
PaddleProvider catches event
         ↓
POST /api/order-completed with webhook data + localStorage products
         ↓
Server: Query Sanity for zip files
         ↓
Server: Send email with attachments
         ↓
Server: Create order in Sanity
         ↓
User redirected to /post-checkout?status=success
```

### Component Hierarchy

```
App Layout
└── ShopWrapper
    └── PaddleProvider (new)
        ├── ShopContext (updated)
        │   ├── BuyModal (updated)
        │   │   ├── AddToCart (updated)
        │   │   └── Product Selection UI
        │   ├── Cart (new)
        │   │   ├── CartItem (new)
        │   │   ├── Checkout Form (new)
        │   │   └── Checkout Button (new)
        │   └── Cart Button (updated)
        └── Page Content
```

---

## Important Notes

### Paddle Non-Catalog Pricing
- Prices are created dynamically per transaction
- No need to pre-configure products in Paddle dashboard
- Full flexibility for complex pricing logic
- customData field stores all license information

### LocalStorage Strategy
- Cart persisted to `outline-cart`
- Products stored to `products` key before checkout (5-minute TTL)
- Ensures order fulfillment works even if webhook delayed
- Clear expired data on app mount

### License Type Complexity
Current system has 6 license types per product:
1. Desktop/Print
2. Web
3. Logo
4. Social Media/Ad
5. Video/Streaming
6. App/Game/Epub

**Migration strategy:**
- Calculate total price client-side (as currently done)
- Pass selected license types in customData
- Use descriptive item names: "Font Name - Desktop License - Size L"
- Store full license breakdown in customData for order fulfillment

### Email Delivery
Current system has nodemailer configured but commented out. Paddle migration includes:
- Reactivate email functionality
- Send zip files as attachments (from Sanity)
- Include order details and license information
- Send admin notification copy

### Error Handling Priorities
1. Cart state corruption (localStorage issues)
2. Paddle initialization failures
3. Checkout API failures
4. Webhook processing failures
5. Email delivery failures

Add comprehensive logging for debugging.

---

## Resources

### Documentation
- **Paddle Docs:** https://developer.paddle.com/
- **Paddle.js SDK:** https://developer.paddle.com/paddlejs/overview
- **Paddle Node SDK:** https://developer.paddle.com/api-reference/overview
- **Non-Catalog Products:** https://developer.paddle.com/concepts/sell/non-catalog-products
- **Webhooks:** https://developer.paddle.com/webhooks/overview

### Reference Implementation
- **Path:** `/Users/ahmedghazi/Sites/overtype/www`
- **Key files:**
  - `web/app/components/shop/Paddle/PaddleProvider.tsx`
  - `web/app/components/shop/Cart.tsx`
  - `web/app/components/shop/Checkout.tsx`
  - `web/app/api/checkout/route.ts`
  - `web/app/api/order-completed/route.ts`

### Testing
- **Paddle Sandbox:** https://sandbox-vendors.paddle.com/
- **Test Cards:** https://developer.paddle.com/concepts/payment-methods/credit-debit-card
- **Webhook Testing:** Use ngrok for local development

---

## Timeline Summary

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 1: Infrastructure** | Steps 1-3 | 3-4 hours |
| **Phase 2: Core Components** | Steps 4-10 | 6-8 hours |
| **Phase 3: Checkout Flow** | Steps 11-14 | 5-7 hours |
| **Phase 4: UI Updates** | Steps 15-18 | 2-3 hours |
| **Phase 5: Testing & Launch** | Steps 19-22 | 2-3 hours |
| **Total** | 22 tasks | **18-25 hours** |

**Recommended approach:** Work in order, test thoroughly at each phase before proceeding.

---

## Risk Mitigation

### High Priority Risks
1. **Complex license pricing logic** - Preserve existing calculation, add thorough tests
2. **Cart state loss** - Implement robust localStorage with error recovery
3. **Webhook failures** - Add retry logic and manual order processing fallback
4. **Email delivery issues** - Log failures, provide manual download option

### Rollback Strategy
- Keep Snipcart code in git history
- Tag current working version before migration
- Test rollback procedure in staging
- Document quick-restore steps

---

## Success Criteria

- [ ] All existing functionality works (product selection, licensing, pricing)
- [ ] Cart persists across sessions
- [ ] Checkout completes successfully
- [ ] Webhooks process orders correctly
- [ ] Emails deliver with correct attachments
- [ ] Orders created in Sanity with full details
- [ ] No increase in checkout abandonment rate
- [ ] Page load performance maintained or improved
- [ ] Mobile experience works smoothly

---

*Last updated: 2025-11-25*
