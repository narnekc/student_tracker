import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

// Execute SQL statements to create a table and insert data from strings.

db.exec(`
    CREATE TABLE  users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id VARCHAR(50) UNIQUE NOT NULL,  
        first_name VARCHAR(100) NOT NULL,    
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        user_role VARCHAR(20) NOT NULL CHECK(user_role IN ('student', 'manager')),
        status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'inactive')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_active DATETIME 
    );
`);

db.exec(`
    CREATE TABLE attendence (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        time_in DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        time_out DATETIME NULL,
        total_hours REAL DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'complete', 'auto_complete')),
        session_date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(student_id)
    );
`)


export default db;