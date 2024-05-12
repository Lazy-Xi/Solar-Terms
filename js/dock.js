var icons = document.getElementsByClassName("icon");
var p;

for (var i = 0; i < 24; i++) {
    icons[i].addEventListener("mouseenter", function () {
        var pre = this.previousElementSibling;
        var next = this.nextElementSibling;

        this.style["transform"] = "scale(1.15) translateY(-12px)";

        function update(e) {
            if (e)
                e.style["transform"] = "scale(0.85) translateY(-7px)";
        }

        update(pre);
        update(next);
    });

    icons[i].addEventListener("mouseleave", function () {
        var pre = this.previousElementSibling;
        var next = this.nextElementSibling;

        this.style["transform"] = "";
        this.style["background-color"] = "white";
        this.style["box-shadow"] = "0 0.125em 0.125em #0d1112";

        function update(e) {
            if (e)
                e.style["transform"] = "";
        }

        update(pre);
        update(next);
    });

    icons[i].addEventListener("mousedown", function () {
        p = this;
        p.style["background-color"] = "rgb(200, 200, 200)";
        p.style["box-shadow"] = "inset 1px 1px 5px white";

        window.setTimeout(function () {
        }, 100);
    });

    icons[i].addEventListener("mouseup", function() {
        this.style["background-color"] = "white";
        this.style["box-shadow"] = "0 0.125em 0.125em #0d1112";
    })
}