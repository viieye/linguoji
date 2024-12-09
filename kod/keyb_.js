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
        let row = document.createElement("div")
        row.classList.add("ricegum")

        for (let i = 0; i < keyboard[ind].length; i++) {
            let char = document.createElement("div")
            char.classList.add("key")
            char.appendChild(document.createTextNode(convstring(keyboard[ind][i][0])))
            let ee=1
            char.style.borderWidth = '1px !important';

            let charcode = keyboard[ind][i][0]

            //style
            char.style.maxWidth=defaultwidth-2+"px"
            char.style.minWidth=defaultwidth-2+"px"
            char.style.maxHeight=defaultheigh-2+"px"
            char.style.minHeight=defaultheigh-2+"px"
            for (let j = 1; j < keyboard[ind][i].length; j++) {
                if (keyboard[ind][i][j]=="s") {
                    char.classList.add("special")
                }
                if (keyboard[ind][i][j]=="i") {
                    ee=0
                }
                if (keyboard[ind][i][j][0]=="g") {
                    char.style.marginLeft=defaultwidth*keyboard[ind][i][j][1]+"px"
                }
                if (keyboard[ind][i][j][0]=="l") {
                    char.style.maxWidth=defaultwidth*keyboard[ind][i][j][1]-2+"px"
                    char.style.minWidth=defaultwidth*keyboard[ind][i][j][1]-2+"px"
                }
                if (keyboard[ind][i][j][0]=="h") {
                    char.style.maxHeight=defaultheigh*keyboard[ind][i][j][1]-2+"px"
                    char.style.minHeight=defaultheigh*keyboard[ind][i][j][1]-2+"px"
                }
                if (keyboard[ind][i][j][0]=="a") {
                    charcode = keyboard[ind][i][j][1]
                }
            }
            if (ee==1) {
                char.onclick=function(){sendcode(charcode)}
            }
            
            row.appendChild(char)
        }

        keybobj.appendChild(row)
    }
}

const keybcodes = [
    [">,}E","Backspace"],
    ["=w","Insert"],
    [",","Space"],
    [">,7,","Enter"],
    ["^","KeyW"],
    ["<","KeyA"],
    ["r","KeyS"],
    [">","KeyD"],
    ["{","KeyQ"],
    ["}","KeyE"],
    [">,*,=w","Delete"],

    ["g","Backquote"],
    ["h","Digit1"],
    ["7","Digit2"],
    ["0","Digit3"],
    ["e","Digit4"],
    ["f","Digit5"],
    ["!","Digit6"],
    ["+","Digit7"],
    ["4","Digit8"],
    ["5","Digit9"],
    ["&","Digit0"],
    ["X","Minus"],
    ["9","Equal"],

    ["m","Tab"],
    //qwe
    ["y","KeyR"],
    ["x","KeyT"],
    ["=","KeyY"],
    ["Y","KeyU"],
    ["@","KeyI"],
    ["o","KeyO"],
    ["/","KeyP"],
    ["Z","BracketLeft"],
    ["~","BracketRight"],
    ["6","Backslash"],

    ["w","CapsLock"],
    ///asd
    ["d","KeyF"],
    ["%","KeyG"],
    ["E","KeyH"],
    ["z","KeyJ"],
    ["*","KeyK"],
    ["k","KeyL"],
    ["Q","Semicolon"],
    ["N","Quote"],

    ["J","ShiftLeft"],
    ["L","KeyZ"],
    ["b","KeyX"],
    ["F","KeyC"],
    ["(","KeyV"],
    ["W","KeyB"],
    ["u","KeyN"],
    ["3","KeyM"],
    ["H","Comma"],
    ["$","Period"],
    ["?","Slash"],
    ["B","Home"],
    [";","ArrowUp"],
    ["8","End"],

    ["O","ControlLeft"],
    ["p","PageDown"],
    ["q","Meta"],
    ["M","AltLeft"],
    //space
    ["v","AltRight"],
    ['\"',"ControlRight"],
    [":","ArrowLeft"],
    ["\'","ArrowDown"],
    ["#","ArrowRight"],

]

window.addEventListener(
    "keydown",
    (event) => {
        for (let i = 0; i < keybcodes.length; i++) {
            if (event.code == keybcodes[i][1]) {
                sendcode(keybcodes[i][0])
            }
        }
    },
    true,
);