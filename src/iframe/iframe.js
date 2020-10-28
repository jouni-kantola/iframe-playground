function syncDocumentDomain() {
    document.domain = "host.playground";
    alert(`Child document domain now:
host.playground`);
}

const { referrer } = document;
console.log({ referrer });

window.addEventListener("message", ({ data, origin }) => {
    if (data.type === "message-to-child") console.log("child received", { data, origin });
});

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

let dots = 30;
setInterval(() => {
    const div = document.createElement("div");
    div.style.fontSize = "30px";
    div.textContent = `${Array(dots++).join(".")}`;
    requestAnimationFrame(() => {
        document.body.appendChild(div);
    });
    window.parent.postMessage(
        {
            type: "message-to-parent",
            args: {
                location: window.location.href,
                message: "I'm growing!",
                width: Math.max(window.innerWidth, document.body.scrollWidth),
                height: Math.max(window.innerHeight, document.documentElement.clientHeight),
            },
        },
        "http://parent.host.playground:8080/"
    );
}, 500);
