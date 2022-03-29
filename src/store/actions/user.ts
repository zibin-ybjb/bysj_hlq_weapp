import { REQUESTLOGIN, REQUESTLOGINSUCCESS, REQUESTLOGINFAILURE } from '../constants/user'

export const requestlogin = () => {
  return {
    type: REQUESTLOGIN,
  };
};
export const requestloginsuccess = () => {
  return {
    type: REQUESTLOGINSUCCESS,
  };
};
export const requestloginfailure = () => {
  return {
    type: REQUESTLOGINFAILURE,
  };
};
