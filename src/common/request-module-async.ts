export const requestModuleAsync = async (
  str: string,
  payload: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    return OZONE.ajax.requestModule(str, payload, (result) => {
      resolve(result);
    });
  });
};
