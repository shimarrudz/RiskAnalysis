import * as sqlite3 from 'sqlite3';

const db = new sqlite3.Database('src/DataBase/database.db');

db.run(`
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        age INTEGER,
        cpf TEXT,
        phone TEXT,
        serasaPFScore INTEGER,
        companyName TEXT,
        businessArea TEXT,
        cnpj TEXT,
        foundationYears INTEGER,
        socialCapital REAL,
        serasaCompanyScore INTEGER,
        annualRevenue REAL,
        criminalModel INTEGER,
        debtHistory INTEGER,
        eligibilityLevel TEXT,
        eligibilityPoints INTEGER
    )
`);

export default db;