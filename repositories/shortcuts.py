from time import time, sleep


def wait_for_data_ready(async_result):
    time_limit = 20
    interval = 1
    initial_time = time()
    while time() - initial_time < time_limit:
        if async_result.ready():
            return async_result.get()
        else:
            sleep(interval)
    else:
        raise TimeoutError()
