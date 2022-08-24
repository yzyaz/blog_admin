/** 改变网页主题theme, 传入主题名见style/theme */
export const changeTheme = (themeName?: string) => {
  const htmlDom = window.document.documentElement;
  if (htmlDom) {
    if (themeName) {
      htmlDom.className = themeName;
    } else {
      htmlDom.className = '';
    }
  }
};
