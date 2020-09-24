const loadNote = function(path) {
    if (path.slice(path.length - 3) != ".md") {
        window.alert("Note not found!");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("note").innerHTML = this.responseText;
            document.getElementById("links").innerHTML = "";
            renderMathTex();
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("links").innerHTML = this.responseText;
                } else if (this.readyState == 4) {
                    window.alert("Something went wrong!")
                }
            }
            xhr2.open("GET", path + "/map/0/10/");
            xhr2.send();
        } else if (this.readyState == 4) {
            window.alert("Note not found!");
        }
    }
    xhr.open("GET", path);
    xhr.send();
};


const search = function() {
    var path = document.getElementById("query").value;
    loadNote(path);
};


const linkClick = function(path) {
    loadNote(path);
    document.getElementById("query").value = path;
    return false;
};