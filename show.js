
    function show(){
        try {
            let jsonString = document.querySelector("#jsontext").value;
            //https://stackoverflow.com/questions/33483667/how-to-strip-json-comments-in-javascript
            let jsonStringStripped = jsonString.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
            let json = JSON.parse(jsonStringStripped);
            let colors = json["tokenColors"];
            let htmls = "<div>"+
                ((colors.map((x) => 
                    `<div style="${
                        ((settings) => {
                            return Object.entries(settings).map(([k,v]) => {
                                if (k == "foreground"){
                                    return `color:${v}`
                                } else if (v == "bold"){
                                    return `font-weight:${v}`
                                } else if (k == "fontStyle"){
                                    return `font-style:${v}`
                                } else {
                                    return `background-color:red`
                                }
                            }
                            ).join(";")
                        }
                        )(x["settings"])
                    }">${JSON.stringify(x)}</div>
                    `
                )).join(""))
            +"/<div>";
            document.querySelector("#result").innerHTML = htmls
        } catch (error) {
            alert(error);
            throw(error)
        }
    }