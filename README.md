# 🧭 FlavorTown - Personal Habit Compass

FlavorTown is a premium, minimalist habit tracking application designed for focus and consistency. Built with React, TypeScript, and Vite, it features high-end animations, advanced analytics, and personal flavor customization.

## ✨ Features

- **Daily Focus**: A streamlined view to track and complete your habits for the day.
- **Advanced Analytics**: Visual progress tracking with weekly performance charts and streak calculations.
- **Splash Screen Experience**: A premium "wow" factor opening sequence.
- **Personalization**: Customizable "Flavors" (accent colors) and personalized user greetings.
- **Data Privacy**: All data is stored locally in your browser. Features Export/Import functionality for backups.
- **Accessibility**: Built with ARIA standards and mobile-first responsive design.

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Glassmorphism design system)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Management**: date-fns

## 📱 Mobile Support (Capacitor)

This project is fully integrated with **Capacitor**, allowing it to run as a native Android application. It includes:
- **Local Notifications**: Custom hook using `@capacitor/local-notifications` for daily habit reminders.
- **Android 13+ Compliance**: Automatic permission handling for modern Android devices.
- **Native Experience**: Glassmorphism UI optimized for fluid mobile interaction.

## 🤖 CI/CD Pipeline (GitHub Actions)

A robust automation pipeline is configured via [android-build.yml](.github/workflows/android-build.yml):
- **Automated Builds**: Every push to `main` triggers a full Android APK build.
- **Production Signing**: Automated APK signing using GitHub Secrets, generating production-ready `.apk` files.
- **Dependency Management**: Smart handling of modern Vite/React 19 dependency resolution.

## 🚀 Getting Started

1.  **Clone the repo**
2.  **Install dependencies**: `npm install`
3.  **Start development server**: `npm run dev`
4.  **Build for production**: `npm run build`

## 📄 License

MIT
