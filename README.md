# Star Wars Character Explorer

A modern, responsive web application for exploring Star Wars characters using the Star Wars API (SWAPI). Built with React, TypeScript, and Tailwind CSS.

![Star Wars Characters](https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800)

## Features

### Core Features

- **Character Browsing**: Display all Star Wars characters from SWAPI with beautiful card layouts
- **Pagination**: Navigate through characters with a smooth pagination system (9 characters per page)
- **Character Details**: Click on any character to view detailed information including:
  - Name, height (in meters), mass (in kilograms)
  - Birth year and gender
  - Date added (formatted as dd-MM-yyyy)
  - Number of films the character appears in
  - Homeworld details (name, terrain, climate, population)
- **Loading States**: Elegant loading animations for better UX
- **Error Handling**: Friendly error messages with retry functionality

### Bonus Features

- **Search**: Real-time search functionality to find characters by name (partial match supported)
- **Filters**: Advanced filtering options:
  - Filter by homeworld
  - Filter by species
  - Filter by number of film appearances
- **Combined Search + Filter**: Search and filter work together seamlessly
- **Mock Authentication**: Complete authentication system with:
  - Email/password login
  - Mock JWT token generation
  - Automatic token refresh every 30 minutes
  - Secure logout functionality
- **Responsive Design**: Fully responsive layout optimized for:
  - Mobile devices (320px+)
  - Tablets (768px+)
  - Desktop screens (1024px+)


## Tech Stack

- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, consistent icons

## Installation

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd star-wars-character-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

### Authentication

The app includes a mock authentication system. Use these credentials to log in:

- **Email**: `demo@starwars.com`
- **Password**: `demo123`

The authentication system includes:
- JWT token generation and storage
- Automatic token refresh every 30 minutes
- Persistent login across page refreshes
- Secure logout functionality

### Browsing Characters

1. After logging in, you'll see a grid of Star Wars characters
2. Each card shows:
   - Character's name
   - Species
   - Number of films
   - A unique, species-based color gradient
3. Use pagination controls at the bottom to navigate through pages

### Searching

- Use the search bar at the top to find characters by name
- Search works in real-time as you type
- Partial matches are supported (e.g., "sky" will find "Luke Skywalker")

### Filtering

1. Click the "Filters" button in the top-right corner
2. Choose filters:
   - **Homeworld**: Filter by planet of origin
   - **Species**: Filter by character species
   - **Film Count**: Filter by number of film appearances
3. Filters can be combined with search
4. Click "Clear All Filters" to reset

### Viewing Details

1. Click any character card to open the detail modal
2. View comprehensive information:
   - Physical characteristics (height, mass)
   - Birth year and gender
   - Date added to database
   - Film appearances count
   - Homeworld information (name, terrain, climate, population)
3. Click the X button or outside the modal to close

## API Information

This application uses the Star Wars API (SWAPI):

- **Base URL**: `https://swapi.dev/api`
- **Endpoints Used**:
  - `/people/` - List all characters with pagination
  - `/people/?search={query}` - Search characters
  - `/planets/{id}` - Get homeworld details
  - `/species/{id}` - Get species information

### API Features

- No authentication required
- Free to use
- Paginated responses
- RESTful design

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist/` directory.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Memoization**: Uses React's `useMemo` for expensive computations
- **Lazy Loading**: Images loaded on demand
- **Efficient Filtering**: Client-side filtering for instant results
- **Pagination**: Only renders visible characters
- **Code Splitting**: Vite automatically optimizes bundle size

### Authentication

Mock authentication demonstrates:
- Token management patterns
- Session persistence
- Automatic refresh mechanisms
- Production-ready authentication flow structure

## Future Enhancements

Potential features for future iterations:

- Favorites system with local storage
- Character comparison tool
- Film and starship details
- Dark mode toggle

## Troubleshooting

### API Issues

If you encounter API errors:
- Check your internet connection
- Verify SWAPI is operational at https://swapi.dev
- Try the retry button in the error message


## Acknowledgments

- [Star Wars API (SWAPI)](https://swapi.dev) for character data
- [Picsum Photos](https://picsum.photos) for random images
- [Lucide React](https://lucide.dev) for icons
- Star Wars universe created by George Lucas

## Contact

For questions or feedback, please open an issue on GitHub.

---

**May the Force be with you!**
