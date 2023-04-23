// eslint-disable-next-line no-restricted-globals
onmessage = (event) => {
    // eslint-disable-next-line no-restricted-globals
    postMessage({
        value: event.data.value
    });
};