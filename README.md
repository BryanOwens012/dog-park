# Hoogle - Google Clone

A modern, responsive Google search interface clone built with Next.js, React, and TypeScript. Features a dark theme design with comprehensive search functionality and accessibility support.

![Hoogle Interface](/.dogwalker_images/Screenshot_2025-10-22_at_11_01_15_PM.png)

## Features

- 🔍 **Search Interface**: Clean, Google-inspired search interface
- 🌙 **Dark Theme**: Modern dark theme with gray color palette
- ⚡ **Next.js 14**: Built with the latest Next.js framework
- 🎯 **TypeScript**: Full type safety throughout the application
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling
- ♿ **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- 📱 **Responsive**: Mobile-first responsive design
- 🧪 **Comprehensive Tests**: Extensive test suite with 80%+ coverage
- 🚀 **Performance Optimized**: Fast loading and smooth interactions

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm
- **Monorepo**: npm workspaces

## Project Structure

```
├── apps/
│   └── frontend/           # Next.js frontend application
│       ├── src/
│       │   ├── pages/      # Next.js pages
│       │   ├── styles/     # Global styles
│       │   └── __tests__/  # Test suites
│       ├── public/         # Static assets
│       └── package.json    # Frontend dependencies
├── package.json           # Root package.json with workspaces
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.0.0 or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hoogle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Features Overview

### Search Interface

- **Search Input**: Large, centered search input with placeholder text
- **Search Methods**: 
  - Form submission (Enter key)
  - "Hoogle Search" button
  - "I'm Feeling Lucky" button
- **Voice & Image Search**: UI buttons for voice and image search (UI only)
- **AI Mode**: Toggle button for AI-powered search mode

### User Interface

- **Header Navigation**: About, Store, Gmail, Images links
- **User Account**: Sign in button and apps menu
- **Footer**: Environmental message and footer links
- **Responsive Design**: Adapts to different screen sizes

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and form structure

## Testing

The project includes a comprehensive test suite covering:

- **Unit Tests**: Individual component testing
- **Integration Tests**: User workflow testing
- **Performance Tests**: Rendering and interaction performance
- **Accessibility Tests**: WCAG compliance verification

### Running Tests

```bash
# Run all tests
npm test

# Run specific test categories
npm test -- --testPathPattern="pages"        # Unit tests
npm test -- --testPathPattern="integration"  # Integration tests
npm test -- --testPathPattern="performance"  # Performance tests

# Generate coverage report
npm run test:coverage
```

### Test Coverage

The test suite maintains high coverage standards:
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+
- **Statements**: 80%+

## Development

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Code formatting (configured via ESLint)

### Component Architecture

- **Pages**: Next.js file-based routing
- **Components**: Functional components with hooks
- **Styling**: Tailwind utility classes
- **State Management**: React useState for local state

### Performance Considerations

- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component for optimized images
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size
- **TypeScript**: Compile-time optimization and error catching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

### Development Guidelines

- Write tests for all new features
- Maintain TypeScript strict mode compliance
- Follow existing code style and patterns
- Ensure accessibility compliance
- Update documentation as needed

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables are required for basic functionality.

### Deployment Platforms

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Google's search interface
- Built with Next.js and the React ecosystem
- Icons from Heroicons and custom SVG implementations
- Testing utilities from Testing Library

## Roadmap

- [ ] Backend search API integration
- [ ] User authentication and accounts
- [ ] Search history and suggestions
- [ ] Advanced search filters
- [ ] Mobile app development
- [ ] Internationalization (i18n)
- [ ] Search analytics and insights

---

**Note**: This is a demonstration project showcasing modern web development practices with Next.js, React, and TypeScript. The search functionality currently logs to console and would need backend integration for actual search capabilities.
