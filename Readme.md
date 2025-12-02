# URL Shortener - Go Fiber + Redis + React

A modern, full-stack URL shortening service built with Go (Fiber framework), Redis, and React with TypeScript. Features a beautiful dark theme with violet accents, rate limiting, custom short URLs, and expiration settings.

![URL Shortener](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Features

- 🔗 **URL Shortening**: Convert long URLs into short, shareable links
- 🎨 **Custom Short URLs**: Create personalized short links
- ⏰ **Expiration Control**: Set custom expiration times (default 24 hours)
- 🚦 **Rate Limiting**: IP-based rate limiting (10 requests per 30 minutes)
- 📊 **Analytics**: Track rate limit usage and reset times
- 🎯 **Domain Protection**: Prevent shortening of the service's own domain
- 🐳 **Dockerized**: Easy deployment with Docker Compose
- 🌙 **Dark Theme**: Beautiful UI with violet accents
- 📱 **Responsive**: Works seamlessly on all devices

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  React Frontend │ ───► │  Go Fiber API   │ ───► │  Redis Database │
│   (Port 3001)   │      │   (Port 3000)   │      │   (Port 6379)   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Backend (Go + Fiber + Redis)
- **Go Fiber**: High-performance web framework
- **Redis**: In-memory data store for URLs and rate limiting
- **Docker**: Containerized deployment
- **CORS**: Cross-Origin Resource Sharing enabled

### Frontend (React + TypeScript)
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **CSS3**: Custom styling with animations
- **Responsive Design**: Mobile-first approach

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** & **Docker Compose** (v3+)
- **Node.js** (v16+) and **npm**
- **Go** (v1.21+) - only if running without Docker
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/navansh03/shorten-url-fiber-redis.git
cd shorten-url-fiber-redis
```

### 2. Setup Backend (Docker)

Navigate to the backend directory and start the services:

```bash
cd backend
docker-compose up --build
```

This will start:
- **API Service**: `http://localhost:3000`
- **Redis Database**: `localhost:6379`

#### Backend Environment Variables

The backend uses the following environment variables (already configured in `backend/api/.env`):

```env
DB_ADDR=db:6379
DB_PASSWORD=
APP_PORT=:3000
DOMAIN=localhost:3000
API_QUOTA=10
ALLOWED_URL=http://localhost:3001/
```

### 3. Setup Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend/url-shortener
npm install
npm start
```

The frontend will start at `http://localhost:3001`

#### Frontend Environment Variables

Create or verify `.env` file in `Frontend/url-shortener/`:

```env
REACT_APP_API_URL=http://localhost:3000
```

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3000

## 🎯 Usage

### Shorten a URL

1. Enter a long URL in the input field
2. (Optional) Enter a custom short code
3. (Optional) Set expiration time in hours
4. Click "Shorten"
5. Copy and share your shortened URL!

### API Endpoints

#### POST `/api/v1` - Shorten URL

**Request:**
```json
{
  "url": "https://www.example.com/very-long-url",
  "short": "custom-code",  // optional
  "expiry": 48             // optional, in hours
}
```

**Response:**
```json
{
  "url": "https://www.example.com/very-long-url",
  "short": "localhost:3000/abc123",
  "expiry": 24,
  "rate_limit": 9,
  "rate_limit_reset": 30
}
```

#### GET `/:url` - Resolve Short URL

Redirects to the original URL:
```
GET http://localhost:3000/abc123
→ Redirects to https://www.example.com/very-long-url
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/api/.env`:

```env
# Database
DB_ADDR=db:6379              # Redis address
DB_PASSWORD=                  # Redis password (empty for no auth)

# Server
APP_PORT=:3000               # API port

# Business Logic
DOMAIN=localhost:3000        # Your domain
API_QUOTA=10                 # Requests per IP per 30 minutes

# CORS
ALLOWED_URL=http://localhost:3001/
```

### Frontend Configuration

Edit `Frontend/url-shortener/.env`:

```env
REACT_APP_API_URL=http://localhost:3000
```

## 🐳 Docker Commands

### Start Services
```bash
cd backend
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Rebuild Containers
```bash
docker-compose up --build
```

### View Logs
```bash
docker-compose logs -f api
docker-compose logs -f db
```

### Check Container Status
```bash
docker-compose ps
```

## 📁 Project Structure

```
Shorten-URL-GOfiber-redis/
├── backend/
│   ├── docker-compose.yml          # Docker orchestration
│   ├── .data/                      # Redis data persistence
│   ├── api/
│   │   ├── .env                    # Backend environment variables
│   │   ├── Dockerfile              # API container config
│   │   ├── go.mod                  # Go dependencies
│   │   ├── main.go                 # Application entry point
│   │   ├── database/
│   │   │   └── database.go         # Redis client setup
│   │   ├── helpers/
│   │   │   └── helpers.go          # Utility functions
│   │   └── routes/
│   │       ├── shorten.go          # URL shortening logic
│   │       └── resolve.go          # URL resolution logic
│   └── db/
│       └── Dockerfile              # Redis container config
│
└── Frontend/
    └── url-shortener/
        ├── .env                    # Frontend environment variables
        ├── package.json            # npm dependencies
        ├── tsconfig.json           # TypeScript configuration
        ├── public/
        │   └── index.html          # HTML template
        └── src/
            ├── App.tsx             # Main app component
            ├── index.tsx           # React entry point
            ├── components/
            │   ├── UrlShortener.tsx        # Main URL shortener component
            │   ├── UrlInput.tsx            # URL input form
            │   ├── CustomUrlInput.tsx      # Custom options
            │   └── ShortenedUrlDisplay.tsx # Result display
            ├── hooks/
            │   └── useUrlShortener.ts      # Custom React hook
            ├── styles/
            │   ├── App.css                 # Main styles
            │   ├── theme.css               # Theme variables
            │   └── components.css          # Component styles
            ├── types/
            │   └── index.ts                # TypeScript types
            └── utils/
                └── api.ts                   # API calls
```

## 🛠️ Development

### Backend Development (Without Docker)

```bash
cd backend/api
go mod download
go run main.go
```

### Frontend Development

```bash
cd Frontend/url-shortener
npm start
```

### Build for Production

**Backend:**
```bash
cd backend
docker-compose build
```

**Frontend:**
```bash
cd Frontend/url-shortener
npm run build
```

## 🔒 Rate Limiting

- **Quota**: 10 requests per IP
- **Window**: 30 minutes
- **Reset**: Automatic after window expires
- **Headers**: Rate limit info returned in response

## 🐛 Troubleshooting

### CORS Error

If you get CORS errors, ensure:
1. Backend is running on `http://localhost:3000`
2. Frontend `.env` has correct `REACT_APP_API_URL`
3. Backend `.env` has correct `ALLOWED_URL`

### Docker Connection Issues

```bash
# Restart all containers
docker-compose down
docker-compose up --build

# Check if containers are running
docker-compose ps

# View container logs
docker-compose logs -f
```

### Redis Connection Failed

```bash
# Check Redis container
docker-compose logs db

# Verify Redis is accessible
docker exec -it redis_db redis-cli ping
# Should return: PONG
```

### Port Already in Use

```bash
# Kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## 🚀 Deployment

### Deploy to Production

1. **Update Environment Variables**
   - Set production `DOMAIN` in backend `.env`
   - Set production `REACT_APP_API_URL` in frontend `.env`

2. **Build Frontend**
   ```bash
   cd Frontend/url-shortener
   npm run build
   ```

3. **Deploy Backend**
   - Use Docker Compose on your server
   - Or deploy to Railway, Render, Fly.io, etc.

4. **Deploy Frontend**
   - Deploy build folder to Vercel, Netlify, etc.

### Recommended Platforms

- **Backend**: Railway, Render, Fly.io, DigitalOcean
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Redis**: Railway, Upstash, Redis Labs

## 📝 API Response Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 400  | Bad Request (Invalid URL) |
| 403  | Forbidden (Custom short already exists) |
| 404  | Not Found (Short URL doesn't exist) |
| 500  | Internal Server Error |
| 503  | Service Unavailable (Rate limit exceeded) |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Navansh Goswami**

- GitHub: [@navansh03](https://github.com/navansh03)
- LinkedIn: [navansh-goswami](https://www.linkedin.com/in/navansh-goswami/)

## 🙏 Acknowledgments

- [Fiber](https://gofiber.io/) - Fast HTTP web framework
- [Redis](https://redis.io/) - In-memory data structure store
- [React](https://reactjs.org/) - JavaScript library for building UIs
- [Docker](https://www.docker.com/) - Containerization platform

## 📞 Support

If you have any questions or need help, please open an issue or contact me on LinkedIn.

---

⭐ Star this repo if you found it helpful!