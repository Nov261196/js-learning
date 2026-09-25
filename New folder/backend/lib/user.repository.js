import { prisma } from "./prisma.js";

const publicFields = { id: true, name: true, email: true };

export function createUser({ id, name, email, passwordHash }) {
  return prisma.user.create({
    data: { id, name, email, passwordHash },
    select: publicFields,
  });
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id) {
  return prisma.user.findUnique({ where: { id }, select: publicFields });
}
