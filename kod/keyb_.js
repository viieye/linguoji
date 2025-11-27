///each row is natuarally a row below previous, otherwise specify gap with ["r",1] or etc for the first char for nonstandard gap, standard gap =1 
///each button position is previous + 1, otherwise specify after character ["char",["g","gap"],["l","length"],["h","height"],"s",]
///same with length and height
///line = y poz == row
///n = 1x1 
///i = indicator


const keyb = [
    [["g","s"],["h","s"],["7","s"],
    ["0"],["e"],["f"],["!"],["+"],["4"],["5"],["&"],["X"],["9"],[">,}E",["l",3],"s"],],
    
    [["m",["l",1.5],"s"],["{","s"],["^","s"],["}","s"],["y","s"],["x","s"],
    ["="],["Y"],["@"],["o"],["/"],["Z"],["~"],["6"],["=w","s",["l",1.5]],],
    [["w","s",["l",1.75]],["<","s"],["r","s"],[">","s"],["d","s"],["%","s"],
    ["E"],["z"],["*"],["k"],["Q"],["N"],[">,7,",["l",3.25],"s"],],
    [["J","s",["l",1.25]],["L","s"],["b","s"],["F","s"],["(","s"],["W","s"],
    ["u"],["3"],["H"],["$"],["?",["l",1.25]],["B"],[";"],["8"],],
    [["O"],["p"],["q"],["M"],[",",["l",5.5]],["v"],[`"`],[":"],["'"],["#"],],
]
const keyb2 = [
    [["g","s"],["h","s"],["7","s"],
    ["0"],["e"],["f"],["!"],["+"],["4"],["5"],["&"],["X"],["9"],[">,}E",["l",3],"s"],],
    [["m",["l",1.5],"s"],["{","s"],["^","s"],["}","s"],["y","s"],["x","s"],
    ["="],["Y"],["@"],["o"],["/"],["Z"],["~"],["6"],["=w","s",["l",1.5]],],
    [["w","s",["l",1.75]],["<","s"],["r","s"],[">","s"],["d","s"],["%","s"],
    ["E"],["z"],["*"],["k"],["Q"],["N"],[">,7,",["l",3.25],"s"],],
    [["J","s",["l",1.25]],["L","s"],["b","s"],["F","s"],["(","s"],["W","s"],
    ["u"],["3"],["H"],["$"],["?",["l",1.25]],["B","s"],[";"],["8","s"],],
    [["O"],["p"],["q","s"],["M"],[",",["l",5.5]],["v"],[`"`],[":"],["'"],["#"],],
]
const neokeyb = [
    [[""],[""],["7","s"],
    ["0"],["e"],["f"],["!"],["+"],["4"],["5"],["&"],["X"],["9"],[">,}E",["l",3],"s"],],
    
    [["",["l",1.5]],["{","s"],["^","s"],["}","s"],["y","s"],["x","s",],
    ["="],["Y"],["@"],["o"],["/"],["Z"],["~"],["6"],["=w","s",["l",1.5]],],
    [["=m=J","s",["l",1.75]],["<","s"],["r","s"],[">","s"],["m","s"],["w","s"],
    ["E"],["k"],["p"],["q"],["8"],["N"],[">,7,",["l",3.25],"s"],],
    [["=J","s",["l",2.25]],["(","s"],["F","s"],["J","s"],["L","s"],
    ["u"],["3"],["H"],[";"],[":"],["?"],],
    [[""],[""],[""],[""],[",",["l",5.5],]],
]
const neokeybalt = [
    [[""],[""],["7","s"],
    [""],[""],[""],[""],["+"],["4"],["5"],["&"],["X"],["9"],[">,}E",["l",3],"s"],],
    
    [["",["l",1.5]],[""],[""],[""],[""],["%","s"],
    ["v"],["*"],["V"],[""],[""],[""],[""],[""],["","s",["l",1.5]],],
    [["=m=J","s",["l",1.75]],[""],[""],[""],["g","s"],["h","s"],
    ["\""],["z"],["M"],["'"],["O"],["Q"],["",["l",3.25],"s"],],
    [["","s",["l",2.25]],["b","s"],[""],[""],[""],[""],
    [""],[""],[""],[""],[""],],
    [[""],[""],[""],[""],[",",["l",5.5],]],
]

const numpadd = [
    [["5"],["z"],["g"],["*","s"],["9","s"]],
    [["F"],["+"],["4"],["#","s"]],
    [["^"],["d"],[",","s"],["~","s"]],
]

const indiK = [
    [[">,*,=w",["l",4.25]]]
]

function build_keyb(keyboard,obj) {
    let defaultwidth = 64
    let defaultheigh = 64



    let keybobj = document.getElementById(obj)
    keybobj.innerHTML=""
    for (let ind = 0; ind < keyboard.length; ind++) {
        //iterate through every row
        let row = document.createElement("div")
        row.classList.add("ricegum")

        for (let i = 0; i < keyboard[ind].length; i++) {
            //iterate every key, row:ind;key:i
            let char = document.createElement("div")
            char.classList.add("key")
            let keystring = ""
            let ee=1
            if (keyboard[ind][i][0]=="") {
                keystring="[]"
                ee=0
            } else {
                keystring=keyboard[ind][i][0]
            }
            char.appendChild(document.createTextNode(convstring(keystring)))
            char.style.borderWidth = '1px !important';

            let charcode = keystring

            //style
            char.style.maxWidth=defaultwidth-2+"px"
            char.style.minWidth=defaultwidth-2+"px"
            char.style.maxHeight=defaultheigh-2+"px"
            char.style.minHeight=defaultheigh-2+"px"
            //iterate through all stylez
            for (let j = 1; j < keyboard[ind][i].length; j++) {
                if (keyboard[ind][i][j]=="s") {
                    //special style
                    char.classList.add("special")
                }
                if (keyboard[ind][i][j]=="i") {
                    //non interactive, display; idk why its i or ee
                    ee=0
                }
                if (keyboard[ind][i][j][0]=="g") {
                    //gap
                    char.style.marginLeft=defaultwidth*keyboard[ind][i][j][1]+"px"
                }
                if (keyboard[ind][i][j][0]=="l") {
                    //length
                    char.style.maxWidth=defaultwidth*keyboard[ind][i][j][1]-2+"px"
                    char.style.minWidth=defaultwidth*keyboard[ind][i][j][1]-2+"px"
                }
                if (keyboard[ind][i][j][0]=="h") {
                    //height
                    char.style.maxHeight=defaultheigh*keyboard[ind][i][j][1]-2+"px"
                    char.style.minHeight=defaultheigh*keyboard[ind][i][j][1]-2+"px"
                }
                if (keyboard[ind][i][j][0]=="a") {
                    //different charcode
                    charcode = keyboard[ind][i][j][1]
                }
            }
            // console.log(keystring+";"+charcode+";ee="+ee)
            if (ee==1) {
                char.addEventListener('click', function() {sendcode(charcode)})
            }
            
            row.appendChild(char)
        }

        keybobj.appendChild(row)
    }
}

const keybcodes = [
    ["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6",
    "Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace",],
    ["Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI",
    "KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete"],
    ["CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH",
    "KeyJ","KeyK","KeyL","Semicolon","Quote","Enter"],
    ["ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN",
    "KeyM","Comma","Period","Slash","ShiftRight","Home","ArrowUp","End"],
    ["ControlLeft","PageDown","Meta","AltLeft","Space","AltRight",
    "ControlRight","ArrowLeft","ArrowDown","ArrowRight"]
]

window.addEventListener(
    "keydown",
    (event) => {
        for (let ind = 0; ind < keybcodes.length; ind++) {
            for (let i = 0; i < keybcodes[ind].length; i++) {
                if (event.code == keybcodes[ind][i]) {
                    // console.log(keybcodes[ind][i]+" "+ind+";"+i);
                    
                    document.getElementById("keyboard").children[ind].children[i].click()
                    //get keybcode loc
                    //send keybcode lock
                    // sendcode(keybcodes[i][0])
                }
            }
        }
    },
    true,
);