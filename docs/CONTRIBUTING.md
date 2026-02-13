# Contributing Guide

## Getting Started

1. **Fork & Clone**
   ```bash
   git clone [your-fork-url]
   cd jadwah-walikota
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Code Style

### TypeScript
- Always use TypeScript for new files
- Prefer interfaces over types for objects
- Avoid `any` type
- Use proper type imports:
  ```tsx
  import type { JadwalKegiatan } from "@/types";
  ```

### React Components
- Use functional components with hooks
- Prefer named exports for components
- Component naming: PascalCase
- Props interface naming: `ComponentNameProps`

Example:
```tsx
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### File Structure
- One component per file
- Use barrel exports (`index.ts`) for clean imports
- Co-locate related files

### Naming Conventions
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`
- Components: `PascalCase`

## Git Workflow

### Branch Naming
- Feature: `feature/description`
- Bugfix: `fix/description`
- Hotfix: `hotfix/description`

### Commit Messages
Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Styling changes
- `docs`: Documentation
- `chore`: Build/config changes

Examples:
```
feat: add export to pdf feature
fix: resolve calendar rendering issue
refactor: extract reusable button component
docs: update README with new features
```

### Pull Request
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create PR with description
5. Wait for review

## Testing

Before submitting PR:
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify no TypeScript errors
- [ ] Test localStorage functionality

## Adding New Features

### 1. Adding New Component

```tsx
// src/components/NewComponent.tsx
interface NewComponentProps {
  // props here
}

export function NewComponent({ ...props }: NewComponentProps) {
  // implementation
}
```

Export in `src/components/index.ts`:
```tsx
export { NewComponent } from "./NewComponent";
```

### 2. Adding New Utility Function

```ts
// src/lib/newUtil.ts
export function newUtilFunction(param: string): string {
  // implementation
}
```

Export in `src/lib/index.ts`:
```ts
export * from "./newUtil";
```

### 3. Adding New Type

```ts
// src/types/newType.ts
export interface NewType {
  // fields here
}
```

Export in `src/types/index.ts`:
```ts
export * from "./newType";
```

## Code Review Checklist

For reviewers:
- [ ] Code follows style guide
- [ ] TypeScript types are proper
- [ ] No unnecessary re-renders
- [ ] Proper error handling
- [ ] Mobile responsive
- [ ] Accessible (a11y)
- [ ] No console.log in production code
- [ ] Proper documentation/comments

## Questions?

If you have questions, feel free to:
- Open an issue
- Contact maintainers
- Check existing documentation
