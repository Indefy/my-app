# NoteHive

A modern, markdown-based note-taking application built with Next.js, TypeScript, and MongoDB.

## Features

- Markdown editor with live preview
- Tag-based organization
- MongoDB persistence
- Modern UI with Tailwind CSS
- Light/Dark mode support
- ⚡ Real-time preview

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: MongoDB with Mongoose
- **Markdown**: React Markdown Editor
- **State Management**: React Hooks
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Indefy/note-hive.git
cd note-hive
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp example.env .env
```
Edit `.env` with your MongoDB connection string and other configurations.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
note-hive/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
├── lib/                   # Utilities and configurations
├── models/               # MongoDB models
└── public/               # Static assets
```

## Environment Variables

Required environment variables:

- `MONGODB_URI`: MongoDB connection string

Optional variables are documented in `example.env`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript compiler check

### Code Style

- ESLint and Prettier configurations are included
- TypeScript strict mode is enabled
- Follow the existing code style

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)
