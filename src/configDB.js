import sqlite from "sqlite3"

export const db = new sqlite.Database('./db.sqlite', () => {
   db.run('PRAGMA foreign_keys = ON;', (err) => {
      if (err) {
        console.error('Erro ao habilitar foreign keys:', err.message);
      }
    });
})