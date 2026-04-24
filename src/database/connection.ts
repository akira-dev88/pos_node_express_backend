import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH || './database/pos_billing.db';
const dbDir = path.dirname(dbPath);

// Create database directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}

console.log(`🗄️  Database path: ${path.resolve(dbPath)}`);

const db: Database.Database = new Database(path.resolve(dbPath), {
  verbose: process.env.NODE_ENV === 'development' ? console.log : undefined,
});

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;