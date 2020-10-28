// document.domain = "host.playground";

window.addEventListener("message", ({ data, origin }) => {
    if (data.type === "message-to-parent") console.log("parent received", { data, origin });
});

setInterval(() => {
    const { contentWindow } = document.querySelector("iframe");

    contentWindow.postMessage(
        {
            type: "message-to-child",
            args: {
                location: window.location.href,
                message: "hello child!",
            },
        },
        "http://child.host.playground:8080/"
    );

    console.log("parent detecting child's location", contentWindow.location.href);
}, 5000);
