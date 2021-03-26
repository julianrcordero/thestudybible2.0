const referenceCode = (chapter, verse) => {
  return "01" + ("000" + chapter).substr(-3) + ("000" + verse).substr(-3);
};

export default referenceCode;
