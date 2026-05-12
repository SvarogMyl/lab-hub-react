# Specification: Lab Hub (React Version)

## Overview
A high-end portfolio and roadmap portal designed to showcase the laboratory's microservice ecosystem. Built with React + Vite for maximum performance.

## Components

### 1. Hero Section
- **Content**: Mission statement and ecosystem high-level overview.
- **Visuals**: Animated text gradients and subtle mesh background.

### 2. Ecosystem Status (Live)
- **Integration**: Fetches status from `lab-monitor-service/api/status`.
- **Display**: Real-time status dots (Green/Red) on project cards.
- **Auto-refresh**: Every 30 seconds.

### 3. Project Gallery
- **Metadata**: Title, description, tech stack icons/tags, and links.
- **Projects included**: Backend Core, Lab Monitor, Data Service.

### 4. Infrastructure Tracker
- **Purpose**: Document the underlying tech and hosting providers.
- **Data**: Render, Vercel, Supabase, Java, Node, Go, Python.

### 5. Roadmap Timeline
- **Structure**: Vertical timeline with status markers (Completed, Active, Pending).

## Technical Stack
- **Frontend**: React 18+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables for theing)
- **Deployment Target**: Vercel

## API Integration
- **Monitor API**: `https://lab-monitor-service.onrender.com/api/status`
