# Checkout Flow Documentation

## Overview

The shop uses a multi-step checkout flow: product selection → cart review → Stripe payment → order fulfillment via email.

---

## Component Hierarchy

```
BuyModal            (product selection + license configuration)
├── LicenseTypeUI   (license type checkboxes)
├── AddToTmpCart    (product checkbox + live price preview)
│   └── Price       (price display with discounts)
└── AddToCart       (confirm selection → move to cart)

CartModal           (cart review)
├── CartItem        (per-item display)
│   └── Price
└── CheckoutBtn     (POST /api/stripe/checkout → redirect to Stripe)

PostCheckout        (success/error page after Stripe redirect)
```

---

## Key Files

| File | Purpose |
|------|---------|
| [components/shop/ShopContext.tsx](../web/app/components/shop/ShopContext.tsx) | Cart & license state (useReducer + localStorage) |
| [components/shop/BuyModal.tsx](../web/app/components/shop/BuyModal.tsx) | Main product selection modal |
| [components/shop/CartModal.tsx](../web/app/components/shop/CartModal.tsx) | Cart review UI |
| [components/shop/CheckoutBtn.tsx](../web/app/components/shop/CheckoutBtn.tsx) | Stripe checkout trigger |
| [components/shop/AddToTmpCart.tsx](../web/app/components/shop/AddToTmpCart.tsx) | Temporary cart logic + italic discount |
| [components/shop/AddToCart.tsx](../web/app/components/shop/AddToCart.tsx) | Move tmpProducts → products |
| [components/shop/CartItem.tsx](../web/app/components/shop/CartItem.tsx) | Single cart item display |
| [components/shop/LicenseTypeUI.tsx](../web/app/components/shop/LicenseTypeUI.tsx) | License type selector |
| [components/shop/Price.tsx](../web/app/components/shop/Price.tsx) | Price display with discount rendering |
| [components/shop/utils.ts](../web/app/components/shop/utils.ts) | Cart total helpers |
| [api/stripe/checkout/route.ts](../web/app/api/stripe/checkout/route.ts) | Creates Stripe checkout session |
| [api/stripe/webhook/route.ts](../web/app/api/stripe/webhook/route.ts) | Handles `checkout.session.completed` |
| [lib/fulfillment.ts](../web/app/lib/fulfillment.ts) | Zip collection, email, Sanity order saving |
| [types/extra-types.ts](../web/app/types/extra-types.ts) | `ProductData` interface (cart item shape) |
| [types/schema.ts](../web/app/types/schema.ts) | Sanity CMS types (Product, LicenseType, etc.) |

---

## State Management

### ShopContext

React Context + `useReducer`. Three independent reducers:

| Reducer | State key | Actions | Description |
|---------|-----------|---------|-------------|
| `productsReducer` | `products` | SET, ADD, REMOVE, REMOVE_BY_SKU, REPLACE, REMOVE_ALL | Final cart. Prevents duplicate SKUs. |
| `trialsReducer` | `tmpProducts` | ADD, REMOVE, REMOVE_ALL | Temporary selections inside BuyModal. |
| `licenseTypeReducer` | `licenseTypeProfil` | SET, ADD, REPLACE, REMOVE, REMOVE_ALL | Selected license types. Prevents duplicates by `_key`. |

Additional state:
- `licenseSizeProfil` — selected `LicenseSize` (company size)
- `currentProduct` — product currently open in BuyModal
- `trials` — trial products (download only, no payment)

**Persistence:** `products` is serialized to `localStorage` key `"oo-cart"`. Loaded on mount unless `?status=success` (post-checkout).

### PageContext

Global UI state: `settings` (from Sanity CMS) and `tab` (`"BUY"` | `"CART"` | `""`).

---

## Products

### Types (from Sanity CMS)

**Product** — top-level product (a typeface family):
```typescript
{
  _id, _type: "product", title, slug,
  bundles: ProductBundle[],   // full family packages
  singles: ProductSingle[],   // individual weights/styles
  licenseSizes: LicenseSize[] // size overrides (optional)
}
```

**ProductBundle** — a curated package of multiple typefaces:
```typescript
{
  price, priceDiscount, priceCrossed,
  categoryLicensePrice: "Full Family" | "Essentials" | "Regular + Italic",
  zip, zipDesktop, zipWeb,
  typefaces: Typeface[]
}
```

**ProductSingle** — one weight or style:
```typescript
{
  price, priceDiscount, priceCrossed,
  typeface: Typeface,
  relatedTypeface: Typeface,  // used for italic discount logic
  zip, zipDesktop, zipWeb
}
```

### Cart Item Shape (`ProductData`)

```typescript
{
  productType: "productBundle" | "productSingle",
  sku: string,
  bundleOrSingleKey: string,
  typefaceSlug?: string,
  relatedTypefaceSlug?: string,
  basePrice: number,          // raw CMS price
  price: number,              // after license size multiplier
  discount: number,           // product discount %
  finalPrice: number,         // after all discounts
  applyDiscount?: boolean,
  hasMultipleLicenses?: boolean,
  totalDiscount?: number,
  productDiscount?: number,
  licenseDiscount?: number,
  productId: string,
  productTitle: string,
  fullTitle: string,          // "Product — Bundle Name"
  description: string,
  licenseSize: string,        // "Individual" | "Team" | "Company"
  licenseTypes: string,       // pipe-separated: "Desktop|Web"
  licenseInfos: string
}
```

---

## Licenses

### LicenseSize (company size tier)

```typescript
{
  title: string,              // "Individual", "Team", "Company"
  priceMultiplier: number,    // applied to base price
  licenseType: LicenseType[]
}
```

Selected via dropdown in BuyModal. Stored in `licenseSizeProfil`.

### LicenseType (usage type)

```typescript
{
  label: string,              // "Desktop", "Web", "Print", "Logo", …
  priceMultiplier: number,    // stacked with size multiplier
  categoryZip: "Desktop" | "Web",
  price, priceFamily, priceMulti
}
```

Multiple types can be selected (checkboxes). Stored in `licenseTypeProfil[]`.

---

## Discounts

Three types of discounts can stack:

### 1. Product Discount (`priceDiscount` in CMS)

Set per bundle or single in Sanity. Applied when `applyDiscount = true`.

Automatically enabled for:
- **Bundles** — always (bundles are already discounted vs buying singles)
- **Italic singles** — when the related regular weight is already in cart or tmpCart

### 2. Italic Companion Discount

Logic in [AddToTmpCart.tsx](../web/app/components/shop/AddToTmpCart.tsx):
1. Product has a `relatedTypeface` (the regular counterpart)
2. Check if that related slug exists in `products` or `tmpProducts`
3. If yes → set `applyDiscount = true` → product discount kicks in

Uses PubSub events (`TMP_PRODUCT_APPLY_DISCOUNT`) to reactively update prices when related products are toggled.

### 3. Multi-License Discount

Applied when **2 or more license types** are selected simultaneously.

- Percentage: `settings.licenseDiscountPercentage` (configured in Sanity, default 15%)
- Label: `settings.licenseDiscountLabel`

### Price Calculation

```
basePrice       = product.price (from CMS)
price           = basePrice × licenseSizeMultiplier × licenseTypeMultiplier(s)
productDiscount = product.priceDiscount (if applyDiscount)
licenseDiscount = settings.licenseDiscountPercentage (if 2+ license types)
totalDiscount   = productDiscount + licenseDiscount
finalPrice      = price - (price × totalDiscount / 100)
```

Helper: `_getPriceWithDiscount(price, discountPercent)` in `utils.ts`.

### Cart Totals (`utils.ts`)

```typescript
cartTotalPrice(items)    // sum of finalPrice
cartSubtotal(items)      // sum of price (pre-discount)
cartTotalDiscount(items) // sum of (price - finalPrice)
cartHasDiscount(items)   // boolean
```

---

## Checkout Steps

### Step 1 — BuyModal: Configure & Select

1. User opens BuyModal (`tab = "BUY"`)
2. Selects **license size** (dropdown) → updates `licenseSizeProfil`
3. Selects **license types** (checkboxes) → updates `licenseTypeProfil`
4. Products re-render with recalculated prices and discounts
5. User ticks product checkboxes → `AddToTmpCart` adds to `tmpProducts`

### Step 2 — AddToCart: Confirm Selection

1. User clicks "Add to Cart" button
2. Any existing `products` with matching SKU are removed
3. All `tmpProducts` moved into `products`
4. Tab switches to `"CART"`

### Step 3 — CartModal: Review

- Lists all cart items with full title, license details, and discounted price
- Shows subtotal, total discount, and final total
- Items can be deleted (removed by SKU)
- "Secure checkout" badge for reassurance

### Step 4 — CheckoutBtn: Stripe Session

1. `POST /api/stripe/checkout` with `products: ProductData[]`
2. Server creates Stripe line items (price in cents, `finalPrice × 100`)
3. Product metadata chunked into session metadata (Stripe 500-char field limit)
4. `allow_promotion_codes: true` — Stripe coupons enabled at checkout
5. Returns `{ url }` → client redirects to Stripe hosted page
6. On success: redirect to `/post-checkout?status=success&session_id=…`
7. On cancel: redirect to `/`

### Step 5 — Stripe Checkout

Stripe-hosted page handles:
- Billing info collection
- Payment method
- Coupon / promotion code entry (enabled via `allow_promotion_codes`)
- Invoice creation (`invoice_creation.enabled: true`)

### Step 6 — Webhook: Order Fulfillment

Triggered by `checkout.session.completed`:

1. Verify signature with `STRIPE_WEBHOOK_SECRET`
2. Idempotency check — query Sanity for existing order with same `session.id`
3. Reassemble chunked products from session metadata
4. Determine zip files needed (Desktop / Web / both) based on selected license types:
   - **Desktop zip:** print, desktop/print, logo, social-media/ad, video/streaming, app/game/epub
   - **Web zip:** web
5. Fetch zip URLs from Sanity assets
6. Retrieve invoice PDF URL from Stripe
7. Save order document to Sanity
8. Send email with zip attachments to customer (CC: studio)

### Step 7 — PostCheckout

- `?status=success` → displays thank-you message, lists purchased items, clears localStorage cart
- Any other status → error message with support email

---

## Stripe Metadata Strategy

Stripe limits session metadata to 500 characters per key. Products are compressed and chunked:

Shortened keys: `s` (sku), `p` (productId), `t` (productType), `b` (bundleOrSingleKey), `ls` (licenseSize), `lt` (licenseTypes), `fp` (finalPrice), etc.

Fields: `products_0`, `products_1`, … + `products_chunks` (chunk count).

---

## Order Saved to Sanity

```typescript
{
  _type: "order",
  status: "paid",
  title: "#SESSION_ID by customer@email.com",
  invoiceNumber: "#SESSION_ID",
  creationDate: ISO timestamp,
  email: string,
  attachments: [{ label: "FontName--desktop.zip", link: "https://cdn.sanity.io/…" }],
  json: string,           // raw dump of products + Stripe session
  invoicePdfUrl: string
}
```

---

## Email

**Transport:** Nodemailer via `asmtp.mail.hostpoint.ch:465`

**Subject:** `Your Outline Online fonts`

**To:** customer email
**CC:** `hello@ahmedghazi.com`, `info@outline-online.com`

**Attachments:** font zip files fetched from Sanity CDN

Filename convention: `FontName--desktop.zip` / `FontName--web.zip`

---

## Environment Variables

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SENDER_EMAIL
SENDER_PASSWORD
```
