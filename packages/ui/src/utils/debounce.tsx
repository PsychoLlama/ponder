export default function debounce(time: number, fn: () => any) {
  let timeout: number;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time, ...args);
  };
}
