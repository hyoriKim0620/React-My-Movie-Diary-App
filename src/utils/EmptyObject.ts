export const EmptyObject = (obj: object) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};
