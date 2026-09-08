const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "routeforge",
    connectionLimit: 5
});

const prisma = new PrismaClient({
    adapter
});

module.exports = prisma;