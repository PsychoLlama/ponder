import debounce from '../debounce';

jest.useFakeTimers();

describe('debounce()', () => {
  it('invokes the function after the specified time', () => {
    const time = 1000;
    const handler = jest.fn();

    const debouncedHandler = debounce(time, handler);

    debouncedHandler();
    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time - 1);
    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(handler).toHaveBeenCalled();
  });

  it('resets the timer every time the function is called', () => {
    const time = 1000;
    const handler = jest.fn();

    const debouncedHandler = debounce(time, handler);

    debouncedHandler();
    jest.advanceTimersByTime(time - 1);
    debouncedHandler();
    jest.advanceTimersByTime(time - 1);
    expect(handler).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(handler).toHaveBeenCalled();
  });

  it('passes the most recent arguments', () => {
    const handler = jest.fn();

    const debouncedHandler = debounce(5, handler);

    debouncedHandler('first');
    debouncedHandler('second');
    debouncedHandler('third');

    jest.runOnlyPendingTimers();

    expect(handler).toHaveBeenCalledWith('third');
  });
});
