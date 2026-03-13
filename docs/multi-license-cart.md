# Cart License Update: Implementation Plan

## Overview

One product per SKU in cart (unchanged). When the user changes the license of an already-carted product, the cart item is **replaced in place** rather than blocked.

The current architecture already supports this — the reducer has a `REPLACE` action. The main gap is UX: `BuyModal` blocks re-selection of in-cart products instead of pre-populating and allowing license edits.

---

## Changes by File

### 1. `web/app/components/shop/BuyModal.tsx` — Pre-populate from cart, allow update

This is the core change. Currently, `isInCart` fully disables a product row if the SKU exists in cart.

New behavior:
- If product is in cart: pre-populate the license selection to match the current cart item
- Allow the user to change license size/type
- "Add to Cart" button becomes **"Update"** when the product is already in cart and the license differs from what's stored

```diff
- const isInCart = products.some((el) => el.sku === input._key);
+ const cartItem = products.find((el) => el.sku === input._key);
+ const isInCart = !!cartItem;

// Pre-populate license from cart when opening the modal
+ useEffect(() => {
+   if (cartItem) {
+     // Set licenseSizeProfil and licenseTypeProfil from cartItem values
+   }
+ }, [cartItem]);

// Button label
- "Add to Cart"
+ isInCart ? "Update" : "Add to Cart"
```

---

### 2. `web/app/components/shop/AddToTmpCart.tsx` — Initialize active state from cart

When the buy modal opens for an in-cart product, the corresponding `AddToTmpCart` row should start as **active** with the current cart values.

```diff
+ const cartItem = products.find((el) => el.sku === _productData.sku);

// Initialize active based on whether this product is already in cart
- const [active, setActive] = useState(false);
+ const [active, setActive] = useState(!!cartItem);
```

---

### 3. `web/app/components/shop/AddToCart.tsx` — Use `REPLACE` for existing SKUs

Fix the dedup logic to use `REPLACE` when the SKU already exists in the main cart, instead of the current broken check (which tests `tmpProducts` against itself).

```diff
  tmpProducts.forEach((product) => {
-   if (tmpProducts.some((dialogProduct) => dialogProduct.sku === product.sku)) {
-     setProducts({ type: "REMOVE", payload: product });
-   }
-   setProducts({ type: "ADD", payload: product });
+   const alreadyInCart = products.some((p) => p.sku === product.sku);
+   if (alreadyInCart) {
+     setProducts({ type: "REPLACE", payload: product });
+   } else {
+     setProducts({ type: "ADD", payload: product });
+   }
  });
```

---

### 4. `web/app/components/shop/ShopContext.tsx` — No changes needed

The `REPLACE` action already exists and works correctly:

```typescript
case "REPLACE":
  return state.map((item: any) =>
    item.sku === payload.sku ? payload : item
  );
```

---

## Files to Change — Summary

| File | Change | Effort |
|------|--------|--------|
| `web/app/components/shop/BuyModal.tsx` | Pre-populate license from cart, "Update" button label | Medium |
| `web/app/components/shop/AddToTmpCart.tsx` | Initialize `active` from cart state | Small |
| `web/app/components/shop/AddToCart.tsx` | Use `REPLACE` vs `ADD` based on cart presence | Small |

> `ShopContext.tsx`, `CartItem.tsx`, `CartModal.tsx`, `extra-types.ts`, and the Stripe API all require **no changes**.

---

## Estimated time

~2 h total (1 h for BuyModal UX, 30 min for AddToTmpCart init, 30 min QA).
