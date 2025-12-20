# 🛋️ Panto - Premium Furniture E-commerce

A modern, full-stack e-commerce platform built with Next.js 15, Payload CMS, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.69-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?logo=tailwindcss)

## ✨ Features

### 🎨 **Frontend**
- **Modern Design** - Clean, minimalist Panto-inspired UI
- **Responsive** - Mobile-first design with Tailwind CSS
- **Product Catalog** - Browse furniture by category (Chairs, Sofas, Lamps, Beds)
- **Shopping Cart** - Add to cart with localStorage persistence
- **Product Details** - High-quality images, descriptions, and pricing
- **Sticky Navigation** - Always accessible header with cart counter

### 🔧 **Backend (Payload CMS)**
- **Headless CMS** - Self-hosted admin panel
- **Collections**: Products, Categories, Orders, Customers, Media
- **PostgreSQL** - Production-ready database (Neon)
- **Image Upload** - Built-in media management
- **Authentication** - Secure admin and customer auth

### 🛒 **E-commerce**
- **Cart Management** - Add, remove, update quantities
- **Real-time Updates** - Cart counter updates instantly
- **Price Calculations** - Automatic subtotal, tax, and total
- **Discount Badges** - Show savings on products
- **Featured Products** - Highlight bestsellers

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **CMS**: [Payload CMS 3.69](https://payloadcms.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Neon)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

### Prerequisites
- Node.js 18.20+ or 20.9+
- npm or pnpm
- PostgreSQL database (Neon recommended)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd panto-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgresql://your-neon-connection-string
PAYLOAD_SECRET=your-secret-key-here
```

4. **Run database migrations**
```bash
npm run payload -- migrate:fresh
```

5. **Seed the database** (optional)
```bash
npm run seed
```

6. **Start development server**
```bash
npm run dev
```

7. **Open in browser**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

```
panto-ecommerce/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public-facing pages
│   │   │   ├── components/      # React components
│   │   │   ├── context/         # React Context (Cart)
│   │   │   ├── products/        # Product pages
│   │   │   ├── cart/            # Shopping cart
│   │   │   └── page.tsx         # Homepage
│   │   └── (payload)/           # Payload admin
│   ├── collections/             # Payload collections
│   ├── lib/                     # Utility functions
│   └── scripts/                 # Seed scripts
├── public/                      # Static assets
└── package.json
```

## 🗄️ Database Schema

### Collections

- **Products** - Furniture items with images, pricing, and categories
- **Categories** - Product categorization (Chair, Sofa, Lamp, Bed)
- **Orders** - Customer orders with line items
- **Customers** - User accounts with auth
- **Media** - Image uploads and management
- **Users** - Admin users

## 🎨 Design Highlights

- **Hero Section** - Full-width background with search
- **Product Grid** - 4-column responsive layout
- **Category Filters** - Quick filtering by type
- **Cart Badge** - Real-time item count
- **Discount Badges** - Visual savings indicators
- **Sticky Header** - Always accessible navigation

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Populate database with sample data |
| `npm run payload -- migrate:fresh` | Reset database |
| `npm run generate:types` | Generate TypeScript types |

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production
```env
DATABASE_URL=your-neon-postgres-url
PAYLOAD_SECRET=secure-random-string
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

## 📝 TODO / Roadmap

- [ ] Stripe integration for payments
- [ ] User authentication (customer login)
- [ ] Order history for customers
- [ ] Product search functionality
- [ ] Reviews and ratings
- [ ] Email notifications
- [ ] Inventory management
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 👤 Author

Built by [Your Name] as a portfolio project demonstrating full-stack e-commerce development with modern web technologies.

---

**⭐ If you found this project helpful, please consider giving it a star!**
