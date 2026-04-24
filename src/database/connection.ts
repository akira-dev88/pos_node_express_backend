import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH || './pos_billing.db';

const db: Database.Database = new Database(path.resolve(dbPath), {
  verbose: process.env.NODE_ENV === 'development' ? console.log : undefined,
});

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;