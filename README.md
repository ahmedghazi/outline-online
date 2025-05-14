# Outline Online

A modern web application built with Next.js and Sanity.io, featuring a headless CMS architecture for managing and delivering content.

## 🚀 Tech Stack

- **Frontend**: Next.js 13+ (React)
- **Backend/Headless CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **TypeScript**: For type safety
- **Node.js**: v18.18.0 (as specified in .nvmrc)

## 📁 Project Structure

- `/web` - Next.js frontend application
- `/studio` - Sanity.io content studio (CMS)
- `.nvmrc` - Specifies Node.js version (18.18.0)

## 🔧 Prerequisites

- Node.js 18.18.0
- Yarn (recommended) or npm
- Sanity.io CLI (for CMS development)

## 🛠️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd outline-online
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   yarn

   # Install web dependencies
   cd web
   yarn

   # Install studio dependencies
   cd ../studio
   yarn
   ```

3. **Environment Setup**
   - Copy `.env.local.example` to `.env.local` in the web directory
   - Configure your Sanity project ID and dataset in the environment variables

## 🚀 Development

### Running the Frontend

```bash
cd web
yarn dev
```

### Running the Sanity Studio (CMS)

```bash
cd studio
yarn dev
```

### Available Scripts

- `yarn s` - Start Sanity Studio
- `yarn w` - Start web development server
- `yarn d` - Quick git commit and push
- `yarn d:p` - Push to preprod branch
- `yarn dm "commit message"` - Commit with custom message and push
- `yarn dm:p "commit message"` - Commit with custom message and push to preprod

## 🌐 Access

- **Sanity Studio (CMS)**: [Outline Online Backoffice](https://outline-online--backoffice.sanity.studio/)
- **Web Application**: [Production URL] (Update with production URL when available)
  www.outline-online.com/

## 📦 Deployment

The project is configured for deployment on Vercel (Next.js) and Sanity.io (CMS).

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Commit your changes with a descriptive message
4. Push to the branch
5. Create a pull request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
update gmail smtp
