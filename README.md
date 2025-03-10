# 🚀 Contribution Guide

## 📂 Folder Structure

### 📌 `.husky/`

Contains Git hooks to ensure commits pass necessary checks such as formatting and linting, integrated with `lint-staged` via the `pre-commit` hook. Also uses `commit-lint` to enforce conventional commits via the `commit-msg` hook.

### 🌍 `server/`

Includes a small Express server that wraps the external API to prevent CORS issues.

### 🏗️ `src/`

Contains all components and utilities, structured as follows:

- **🧪 test/**: Includes unit tests.
- **🎨 assets/**: Contains all assets like fonts and images.
- **📦 components/**: Stores global components used throughout the project.
- **⚙️ config/**: Holds integrations and configurations for third-party libraries.
- **🔄 hooks/**: Contains general custom hooks.
- **📜 interfaces/**: Stores all TypeScript types and interfaces.
- **🖼 layout/**: Includes wrappers for the entire app layout.
- **🛠 lib/**: Contains general helper functions.
- **🌍 locale/**: Manages localization files (currently supports `EN` and `FA`).
- **📌 modules/**: Follows a feature-based structure, where each folder corresponds to a module containing its own related files.
- **🌐 providers/**: Stores context providers and shared data handlers.

---

## 🔗 References

- [Vite Documentation](https://vitejs.dev/)
- [ReactJS Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ESLint Rules](https://eslint.org/docs/latest/rules)
- [Prettier (Formatting)](https://prettier.io/)
- [ShadCN UI Library](https://ui.shadcn.com/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Hook Form (Form Handling)](https://react-hook-form.com/)
- [Jest (Test Runner)](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

---

## 🌍 Environment Variables

```plaintext
VITE_SERVER_URL=
API_URL=
```

---

## 📜 Scripts

### 📌 Project Setup

```sh
npm i --legacy-peer-deps
```

### 🏃 Run Client (Development Mode)

```sh
npm run dev
```

### 📦 Build Project

```sh
npm run build
```

### 🚀 Run Server (port=5050)

```sh
npm run server
```

### 🏁 Run Project

```sh
npm run start
```

### 🔍 Lint Project

```sh
npm run lint
```

### 🎨 Format Code

```sh
npm run format
```

### 🧪 Run Tests

```sh
npm run test
```

---

## ✅ TODOs

To contribute effectively, here’s a list of pending tasks:

- [ ] Add more unit test(currently we have 2 for form components) 📈
- [ ] Complete the localization files 🚀

---

## 💡 Tips for Contributors

- **For Running the Application Correctly**: please use `npm run server`.

---
