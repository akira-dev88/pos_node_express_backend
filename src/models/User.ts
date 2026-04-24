import db from '../database/connection';
import { User } from '../types';

export class UserModel {
  static create(user: Omit<User, 'created_at' | 'updated_at'>): User {
    const stmt = db.prepare(`
      INSERT INTO users (user_uuid, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(user.user_uuid, user.name, user.email, user.password, user.role);

    return this.findByEmail(user.email)!;
  }

  static findByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  static findById(uuid: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE user_uuid = ?');
    return stmt.get(uuid) as User | undefined;
  }

  static findAll(): User[] {
    const stmt = db.prepare('SELECT user_uuid, name, email, role, created_at, updated_at FROM users');
    return stmt.all() as User[];
  }

  static update(uuid: string, updates: Partial<User>): User | undefined {
    const allowedFields = ['name', 'email', 'password', 'role'];
    const updateFields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updateFields.length === 0) return this.findById(uuid);

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(uuid);

    const stmt = db.prepare(`
      UPDATE users SET ${updateFields.join(', ')} WHERE user_uuid = ?
    `);

    stmt.run(...values);
    return this.findById(uuid);
  }

  static delete(uuid: string): boolean {
    const stmt = db.prepare('DELETE FROM users WHERE user_uuid = ?');
    const result = stmt.run(uuid);
    return result.changes > 0;
  }

  static toSafeUser(user: User): Omit<User, 'password'> {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}