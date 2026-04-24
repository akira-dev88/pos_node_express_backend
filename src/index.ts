import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runMigrations } from './database/migrations/001_initial';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import cartRoutes from './routes/carts';
import saleRoutes from './routes/sales';
import settingsRoutes from './routes/settings';
import customerRoutes from './routes/customers';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Run database migrations
runMigrations();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/customers', customerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'POS Billing API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});

export default app;