// document.domain = "host.playground";

const { referrer } = document;
console.log({ referrer });

setInterval(() => {
    window.parent.postMessage(
        {
            type: "message-to-parent",
            args: {
                location: window.location.href,
                message: "hello parent!",
            },
        },
        "http://parent.host.playground:8080/"
    );
}, 5000);
