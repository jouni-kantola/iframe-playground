function syncDocumentDomain() {
    document.domain = "host.playground";
    alert(`Parent document domain now:
host.playground`);
}

window.addEventListener("message", ({ data, origin }) => {
    if (data.type === "message-to-parent") {
        console.log("parent received", { data, origin });
        const { width, height } = data.args;

        if (!width || !height) return;
        requestAnimationFrame(() => {
            const iframe = document.querySelector("iframe");
            iframe.style.width = width;
            iframe.style.height = height;
        });
    }
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
