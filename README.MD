# 🗄 Database Design (ERD)
![LuxHouse ERD](./server/docs/ERD-LuxHouse.png)

#🏠 LuxHouse | Premium E-Commerce Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/backend-NestJS-E0234E?style=for-the-badge\&logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/frontend-React-61DAFB?style=for-the-badge\&logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?style=for-the-badge\&logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/cache-Redis-DC382D?style=for-the-badge\&logo=redis)](https://redis.io/)
[![Docker](https://img.shields.io/badge/deployment-Docker-2496ED?style=for-the-badge\&logo=docker)](https://www.docker.com/)

---

## 📌 Overview

**LuxHouse** là một nền tảng thương mại điện tử full-stack dành cho phân khúc nội thất cao cấp.
Hệ thống được thiết kế với tư duy **Production-Ready Architecture**, tập trung vào:

* 🔐 Security-first authentication
* 📈 Scalability & modular design
* ⚙ Clean & maintainable codebase
* 🐳 Containerized deployment

LuxHouse không chỉ là một website bán hàng — mà là một hệ thống backend được xây dựng theo chuẩn doanh nghiệp.

---

# 🏗 System Architecture

LuxHouse áp dụng **Decoupled Architecture**:

```
Client (React + Vite)
        ↓
REST API (NestJS)
        ↓
PostgreSQL (Primary Data Store)
        ↓
Redis (Token Store & Cache Layer)
```

### Architectural Principles

* Separation of Concerns
* Modular Backend Structure
* Stateless Access Tokens
* Redis-backed Session Control
* Role-based Endpoint Protection

---

# 🔐 Authentication & Security Strategy

LuxHouse triển khai cơ chế **JWT Refresh Token Rotation + Redis Store**.

### Token Strategy

| Token Type    | Lifetime | Storage       | Purpose         |
| ------------- | -------- | ------------- | --------------- |
| Access Token  | 15m      | Client Memory | API Access      |
| Refresh Token | 7d       | Redis         | Session Renewal |

### Security Mechanisms

* Password hashing with **bcrypt**
* Refresh Token stored in Redis (TTL 7 days)
* Instant token revocation (logout / suspicious activity)
* Role-Based Access Control (Admin / User)
* Global ValidationPipe
* Throttler (Rate limiting)
* Secure CORS configuration
* Helmet security headers

Redis key pattern:

```
luxhouse::refreshToken:{hashedToken}
```

---

# 🚀 Tech Stack

| Layer             | Technologies                                        |
| ----------------- | --------------------------------------------------- |
| **Frontend**      | React 18 (Vite), TanStack Query, TailwindCSS, Axios |
| **Backend**       | NestJS, Prisma ORM, Passport.js                     |
| **Database**      | PostgreSQL                                          |
| **Cache/Session** | Redis                                               |
| **Security**      | JWT, Bcrypt, Throttler, Guards                      |
| **Infra**         | Docker, Docker Compose                              |

---

# 📂 Project Structure

## 🔹 Backend (Modular NestJS Design)

```text
server/
├── prisma/                 # Database Schema & Migrations
├── src/
│   ├── common/             # Shared resources across modules
│   │   ├── base/           # Base classes (Services, Repositories)
│   │   ├── enums/          # System-wide enumerations
│   │   ├── interfaces/     # TypeScript interfaces/types
│   │   ├── pipes/          # Custom validation pipes
│   │   ├── exceptions/     # Custom error handling logic
│   │   └── helper/         # Utility functions (e.g., slugify.ts)
│   ├── modules/            # Main business features
│   │   ├── auth/           # Login, Register, Token Management
│   │   ├── cart/           # Shopping cart logic
│   │   ├── categories/     # Product taxonomy
│   │   ├── products/       # Core product & variant logic
│   │   ├── orders/         # Transaction & workflow
│   │   ├── gemini/         # AI integration features
│   │   ├── home/           # Homepage data orchestration
│   │   └── dashboard/      # Admin analytics & management
│   ├── app.module.ts       # Root application module
│   ├── prisma.service.ts   # Prisma ORM client service
│   └── main.ts             # Application entry point
├── .env                    # Environment variables
└── docker-compose.yml      # Container orchestration
```
## 🔹 Frontend (Feature-based Structure)

```text
client/
├── public/                 # Static assets
├── src/
│   ├── app/                # Application entry & routing
│   │   ├── routes/         # Route definitions
│   │   └── App.tsx         # Root component
│   ├── features/           # Core business modules
│   │   ├── auth/           # Login, Register, Forget Password
│   │   ├── products/       # Product listing & filtering
│   │   ├── productDetail/  # Detailed product view
│   │   ├── cart/           # Shopping cart management
│   │   ├── chatbot/        # AI-powered customer support
│   │   ├── vouchers/       # Discount & Promotion system
│   │   ├── orders/         # Order history & Tracking
│   │   ├── admin/          # Admin dashboard & Analytics
│   │   └── profile/        # User account management
│   ├── lib/                # Core library configurations
│   │   ├── http.ts         # Axios/Fetch interceptors
│   │   └── tokenManager.ts # JWT management logic
│   ├── shared/             # Reusable global components
│   ├── styles/             # Global CSS & Tailwind base
│   ├── utils/              # Helper functions (debounce, formatCurrency)
│   └── main.tsx            # App entry point
├── tailwind.config.js      # Styling configuration
└── vite.config.ts          # Build tool configuration
```

---



# 🛠 Installation & Setup

## Prerequisites

* Node.js v18+
* Docker & Docker Compose
* pnpm

---

## 🐳 Quick Start (Recommended)

```bash
git clone https://github.com/khanhdev1902/LuxHouse.git
cd LuxHouse
docker-compose up --build
```

### Services

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:3000](http://localhost:3000)

---

## 🖥 Manual Setup

### Backend

```bash
cd server
pnpm install
pnpm prisma migrate dev
pnpm run start:dev
```

### Frontend

```bash
cd client
pnpm install
pnpm run dev
```

---

# 🌍 Environment Variables

Tạo file `.env` trong thư mục `server/`

```env
PORT=3000

DATABASE_URL="postgresql://user:password@localhost:5432/luxhouse"

REDIS_URL="redis://localhost:6379"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"
```

---

# 📦 Core Features

* User Registration & Login
* JWT Access + Refresh Authentication
* Redis-based Session Management
* Role-based Authorization
* Product & Variant CRUD
* Secure Logout with Token Revocation
* Protected Admin Routes

---

# 🧠 Roadmap

* VNPay / Momo integration
* Order tracking system
* Cloud image upload (S3 / Cloudinary)
* Email verification
* Websocket notifications
* CI/CD pipeline (GitHub Actions)
* Unit & Integration Tests

---

# 👨‍💻 Author

**Khanh**
Fullstack Developer

GitHub: [https://github.com/khanhdev1902](https://github.com/khanhdev1902)

---

# 📄 License

This project is licensed under the MIT License.

---
