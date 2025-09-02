// getDateList.js
export function getDateList(from, to) {
  const list = [];
  let date = new Date(from);
  const end = new Date(to);

  while (date <= end) {
    list.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 1);
  }
  return list;
}
