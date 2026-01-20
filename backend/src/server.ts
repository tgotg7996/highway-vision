import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import algorithmsRouter from './routes/algorithms.js';
import camerasRouter from './routes/cameras.js';
import eventsRouter from './routes/events.js';
import usersRouter from './routes/users.js';
import settingsRouter from './routes/settings.js';
import notificationsRouter from './routes/notifications.js';

const app = express();
const PORT = process.env.PORT || 3001;

// =====================================================
// Middleware
// =====================================================

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// =====================================================
// Routes
// =====================================================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Digital Eye API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/algorithms', algorithmsRouter);
app.use('/api/cameras', camerasRouter);
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/notifications', notificationsRouter);

// =====================================================
// Error Handling
// =====================================================

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', error);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   Digital Eye Smart Highway AI - Backend API          ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║   Server running on: http://localhost:${PORT}           ║`);
  console.log(`║   Environment: ${process.env.NODE_ENV || 'development'}                          ║`);
  console.log(`║   Supabase: ${process.env.SUPABASE_URL ? '✓ Connected' : '✗ Not configured'}                    ║`);
  console.log('╚════════════════════════════════════════════════════════╝');
});

export default app;
