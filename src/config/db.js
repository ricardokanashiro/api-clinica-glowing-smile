import sqlite from "sqlite3"
import "dotenv/config"

const db = new sqlite.Database(process.env.DATABASE_PATH, () => {
   db.run('PRAGMA foreign_keys = ON;', (err) => {
      if (err) {
        console.error('Erro ao habilitar foreign keys:', err.message);
      }
    });
})

export { db }