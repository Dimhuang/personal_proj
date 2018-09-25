export const isMobile = (func) => {
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    func(true)
    return
  } else {
    func(false)
    return
  }
};
