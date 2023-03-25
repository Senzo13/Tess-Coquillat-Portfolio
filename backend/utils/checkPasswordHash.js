import bcrypt from 'bcryptjs';

export const checkHashedPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
