export function formatDateTime(input) {
  const inputDate = new Date(input);

  // Format time
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${ampm}`;

  // Format date
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  return `${formattedTime} · ${formattedDate}`;
}
