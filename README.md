# riseupleague.com

The official v2 website for [www.riseupleague.com](https://www.riseupleague.media).

🚧 This website is still being actively worked on 🚧

## Tech Stack

This repository is a [Turborepo monorepo](https://turbo.build/repo/docs) that contains the [www.riseupleague.com](https://www.riseupleague.media) website, as well as the [admin.riseupleague.com](https://admin.riseupleague.com) for game-tracking purposes used by the Rise Up staff.

### Frontend

- [React](https://react.dev)
- [NextJS 13](https://nextjs.org/) using App Router
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/)

### Backend

- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Project Archicture

```
├── apps
│   ├── bball (riseupleague.com; NextJS app)
│   └── bball-admin (admin.riseupleague.com; NextJS app)
├── packages
│   ├── eslint-config-custom (custom ESLint configuration)
│   ├── tailwind-config (all tailwind configs in /apps extend this config)
│   └── tsconfig (all tsconfigs in /apps extend this config)
│   └── ui (riseupleague UI library; shadcn-ui components)
└── ... (config files)
```

## Development

To run all projects:

```
> npm i
> npm run dev
```

To clear cache and start up the dev server:

```
> npm run fresh:start
```
