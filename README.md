# Guestara – Menu & Services Management Backend

------------------------------------------------------


## ARCHITECTURE

### The project follows a modular, service-based architecture.

- modules/   → API resources (category, item, booking, addon)
- services/  → business logic (pricing, tax, booking)
- types/     → domain models (pricing types)
- utils/     → shared helpers

Controllers are thin, services contain logic,
and models only define data.

------------------------------------------------------

## DATA MODELING 

### Category:
- Top-level entity
- Owns tax configuration

### Subcategory:
- Belongs to a category
- Can override tax

### Item:
- Belongs to either category OR subcategory
- Stores pricing configuration (not final price)
- Optional availability for booking

### Booking:
- Item + date + time slot
- Prevents double booking

### Add-ons:
- Belong to items
- Affect final price

MongoDB was chosen for flexible pricing
and nested configurations.

------------------------------------------------------


## TAX INHERITANCE

### Tax is resolved dynamically:

1. Item tax (if defined)
2. Subcategory tax
3. Category tax

Resolved tax is NEVER stored.
This ensures category tax changes
automatically reflect everywhere.

------------------------------------------------------

## PRICING ENGINE

### Each item supports exactly ONE pricing type:

- Static
- Tiered
- Complimentary
- Discounted
- Dynamic (time-based)

Pricing is calculated at runtime using
a centralized pricing service.
Final price is returned via:
GET /items/:id/price

------------------------------------------------------


## BOOKING

### Items may define availability:
- Days
- Time slots

### Booking rules:
- No double booking
- Conflicts blocked at service + DB level

------------------------------------------------------


## TRADEOFFS

### Not implemented intentionally:
- Authentication
- Payments
- Multi-restaurant support

### Reason:
Focus kept on backend design,
business logic, and correctness.

------------------------------------------------------

## REFLECTIONS

### Why MongoDB:
Fits flexible pricing & availability models well.

### What I learned:
- Business logic matters more than CRUD
- Avoid storing derived data
- Clear service boundaries help scaling

### Hardest part:
Designing a clean pricing engine.

### What I’d improve:
- Add automated tests
- Stronger validation for pricing rules

