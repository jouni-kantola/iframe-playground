// document.domain = "host.playground";

window.addEventListener("message", ({ data, origin }) => {
    if (data.type === "message-to-parent") console.log("parent received", { data, origin });
});
