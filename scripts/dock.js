var icons = document.getElementsByClassName("icon");

for (var i = 0; i < 24; i++) {
    icons[i].addEventListener("mouseenter", function() {
        var pre = this.previousElementSibling;
        var next = this.nextElementSibling;

        function update(e) {
            if (e)
                e.style["transform"] = "scale(0.85) translateY(-7px)";
        }

        update(pre);
        update(next);
    });

    icons[i].addEventListener("mouseleave", function() {
        var pre = this.previousElementSibling;
        var next = this.nextElementSibling;

        function update(e) {
            if (e)
                e.style["transform"] = "";
        }

        update(pre);
        update(next);
    });
}