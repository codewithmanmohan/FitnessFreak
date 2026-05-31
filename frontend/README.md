# Frontend — FitnessFreak

This is the React frontend for FitnessFreak built with Vite.

## Requirements

- Node.js 18+ and npm

## Scripts

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server (default: http://localhost:5173)
- `npm run build` — create production build in `dist/`
- `npm run preview` — preview production build locally

## Environment

Create an `.env` or `.env.local` if you need to set runtime variables. Common example:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Notes

- Check `package.json` for exact script names.
- `frontend/.gitignore` is included to keep `node_modules/`, build output, and env files out of Git.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
