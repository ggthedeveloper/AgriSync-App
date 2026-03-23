# AgriSync — Intelligent Farming Platform

AI-powered agricultural platform for Indian farmers with multi-language support (English, Telugu, Hindi).

Link: https://agri-sync-app.vercel.app/  

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

**Demo login:** `9999999999` / `farmer123`

---

## Project Structure

```
agrisync/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Root — auth gate
    ├── App.jsx                   # Main shell — topbar, nav, routing, shared state
    │
    ├── data/
    │   ├── constants.js          # All static data: crops, weather, schemes, users…
    │   └── translations.js       # EN / Telugu / Hindi string tables
    │
    ├── utils/
    │   ├── storage.js            # localStorage wrapper (S.get / S.set / S.del)
    │   └── theme.js              # TH(dark) → color token object
    │
    ├── components/
    │   ├── Icons.jsx             # Zero-dependency inline SVG icon system
    │   ├── UI.jsx                # Shared primitives: Modal, Card, Btn, Inp, Sel, Bdg, Bar, SL, FL
    │   ├── PayModal.jsx          # UPI / Card / Net Banking payment flow
    │   └── UpgradeGate.jsx       # Plan gate — blocks page & shows upgrade options
    │
    └── pages/
        ├── Auth.jsx              # Login / Sign-up / OTP screen
        ├── Dashboard.jsx         # Weather, soil health, recommended crops, alerts, plan picker
        ├── Diagnose.jsx          # Photo upload → AI crop disease diagnosis
        ├── Advisor.jsx           # AI crop recommendations based on location & soil
        ├── Market.jsx            # MSP rates, mandi prices, government schemes
        ├── Community.jsx         # Farmer social feed with likes & comments
        ├── Health.jsx            # Health tracker, crop insurance schemes, loan schemes
        └── Hub.jsx               # Hardware, cold storage, farm evaluation, transport
```

## Features

| Feature | Description |
|---------|-------------|
| **Multi-language** | EN / తెలుగు / हिन्दी — switch live in topbar |
| **3 Subscription Plans** | Free → Basic (₹2,000/mo) → Premium (₹10,000/mo) |
| **Payment Flow** | UPI (GPay/PhonePe/Paytm/BHIM), Card, Net Banking |
| **GPS Location** | Nominatim reverse-geocoding, manual fallback |
| **Dark Mode** | Full dark/light theme toggle |
| **Offline Banner** | Visual indicator for offline state |
| **Govt. Scheme Links** | Direct links to pmkisan.gov.in, pmfby.gov.in, nabard.org etc. |
| **Crop Insurance** | PMFBY application flow with premium calculator |
| **Loan Support** | KCC, Gold Loan, Infrastructure Loan schemes |
| **Cold Storage** | Godown booking with cost estimator |

## localStorage Keys

All keys are prefixed `as_`:

| Key | Content |
|-----|---------|
| `user` | Logged-in user object |
| `farm` | Farm profile (location, soil, acres…) |
| `lang` | Selected language code |
| `dark` | Dark mode boolean |
| `sub`  | Subscription tier: free / basic / premium |
| `diag` | Last diagnosis result |
| `adv`  | Advisor run state |
| `fp`   | Farm plan (array of crop names) |
| `posts`| Community posts array |
| `cart` | Hub cart items |
