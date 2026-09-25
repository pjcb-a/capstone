## Tech Stack

- React
- TypeScript
- TailwindCSS
- Node.js
- Git & Github
- Vite
- Vitest
- React Testing Library
- CSS

## Project Rules

### 1. Keep Components Focused
React components should have a clear, focused UI responsibility. Do not place unrelated UI, validation, or reusable logic into one component. Move distinct responsibilities into dedicated components or modules when appropriate.

### 2. Follow the Existing Project Structure
Before creating new files or introducing new patterns, inspect the existing project structure and reuse established conventions. Keep feature-specific components, logic, and styles organized within the appropriate feature folder.

### 3. Prioritize Accessible Form Interfaces
All form controls must have accessible labels and clear validation feedback. Interactive elements must support keyboard navigation and provide a visible focus state. Do not rely on color alone to communicate errors or status.

### 4. Verify Before Declaring a Feature Complete
After implementing a feature, run the relevant tests and fix any failures before considering it complete. Also run the project's lint and production build checks. New interactive behavior should include tests for important success, validation, and edge-case paths.