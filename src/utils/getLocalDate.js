const getLocalDate = (date) => {
  const d = new Date(date);
  const localTime = d.toLocaleTimeString('en', { hour12: false });
  const localDate = d.toLocaleDateString('zh-cn').replace(/\//g, '-');
  return `${localDate} ${localTime}`;
};

export default getLocalDate;
