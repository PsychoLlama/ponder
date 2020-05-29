export default function debounce<Handler extends (...args: any[]) => any>(
  time: number,
  fn: Handler
) {
  let timeout: number;

  return (...args: Parameters<Handler>) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time, ...args);
  };
}
