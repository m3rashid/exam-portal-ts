import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const createAdmin = async () => {
  const password = 'rohini24';
  const hash = await bcrypt.hash(password, saltRounds);

  const tempdata = new UserModel({
    name: 'League of Learners',
    password: hash,
    emailid: 'leagueoflearners.online@gmail.com',
    contact: '+65 12345678',
    type: 'ADMIN',
  });

  await tempdata.save();
  console.log('Admin Created');
  process.exit(0);
};

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};
