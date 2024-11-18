This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Product Catalog Application

This is a comprehensive product catalog application built with React, Redux, and Next.js.

[https://product-catalog-hnd8cy6b6-lora-zuliceks-projects.vercel.app/]

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/product-catalog.git
   ```
2. Navigate to the project directory:
   ```
   cd product-catalog
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Features
- Product listing with pagination
- Product filtering and sorting
- Product search
- User authentication
- Shopping cart functionality

## Project Structure
```
product-catalog/
├── app/
│   ├── fonts
│   ├── globals.css
├---cypress/
├── lib/
|   ├── utils.ts
├── src/
│   |── components/
|   ├── hooks/
|   ├── services/
|   ├── store/
├── .gitignore
├── cypress.config.ts
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Testing
Open cypress testing with:
```
npm run cypress
```
Run tests with:
```
npm run test:e2e
```