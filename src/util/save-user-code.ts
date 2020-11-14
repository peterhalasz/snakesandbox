let inDebounce: NodeJS.Timeout;

const saveUserCode = (userCode: string) => {
  clearTimeout(inDebounce);

  inDebounce = setTimeout(
    () => window.localStorage.setItem("userCode", userCode),
    500
  );
};

export default saveUserCode;
