# Parkview-Retail

# Parkview Shopping App

This is a React Native e-commerce application built with Expo, Zustand for state management, and Supabase as the backend. The app allows users to browse products, view categories, add items to their cart, and manage their shopping experience with a modern mobile UI.

---

## Features

- **Product Listing:** Browse a list of products fetched from a backend API (Supabase).
- **Categories:** Filter products by categories.
- **Product Details:** View detailed information about each product.
- **Add to Cart:** Add products to your cart with instant feedback.
- **Persistent State:** Uses Zustand with AsyncStorage to persist product and category data.
- **Navigation:** Tab-based navigation with Home, Shop, Search, and Profile screens.
- **Responsive UI:** Compact and regular product card layouts for different sections.
- **Error & Loading Handling:** User-friendly loading indicators and error messages.

---

## Tech Stack

- **React Native** (with Expo)
- **Zustand** for global state management
- **Supabase** for backend (database, authentication, storage)
- **AsyncStorage** for local persistence
- **Expo Router** for navigation
- **TypeScript** for type safety

---

## Project Structure

```
parkview/
├── app/
│   └── (tabs)/
│       ├── index.tsx         # Home screen
│       ├── shop.tsx          # Shop screen
│       ├── search.tsx        # Search screen
│       └── profile.tsx       # Profile screen
├── components/
│   └── ui/
│       ├── ProductCard.tsx   # Product card component
│       ├── HomeHeader.tsx    # Home screen header
│       └── Wrapper.tsx       # Layout wrapper
├── store/
│   └── productStore.ts       # Zustand store for products/categories
├── constants/
│   └── Colors.ts             # App color palette
├── lib/
│   └── api.ts                # API functions for Supabase
│   └── supabase.ts           # Supabase client initialization
├── type.ts                   # TypeScript types (e.g., Product)
└── ...
```

---

## How It Works

- **State Management:**  
  The app uses Zustand to manage products and categories globally. Data is fetched from Supabase and persisted locally with AsyncStorage.

- **API Integration:**  
  All product and category data is fetched from Supabase using functions defined in `lib/api.ts`. The Supabase client is initialized in `lib/supabase.ts`.

- **UI Components:**  
  Product cards display product info and allow adding to cart. The UI adapts between compact and regular layouts.

- **Navigation:**  
  Expo Router provides a tab-based navigation structure for easy access to Home, Shop, Search, and Profile screens.

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file with your Supabase URL and Anon Key:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
4. **Start the app**
   ```
   npx expo start
   ```

---

## Notes

- Make sure your Supabase project is set up with the correct tables for products and categories.
- You can customize the UI and add more features as needed.

---

## License

This project is for educational purposes.
