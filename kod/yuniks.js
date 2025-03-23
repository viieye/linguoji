var bar = ""
var rows = []
var hist = []
var his2 = []
var addressloc = "Hr,r6m,rz*^,"//,r to separate, ,r becomes kw
var shift = 0
var keybshift = [0,0]

function sendcode(code) {
    console.log(keybshift);
        
    //emptycode
    if (code=="") {
        return 0
    }
    //backspace
    if (code==">,}E") {
        bar=bar.substring(0, bar.length - 1);
        updateconsole()
        return 0
    }
    //enter
    if (code==">,7,") {
        reply(displayAddressLoc(addressloc,1) + ",," +bar)
        reply(shellExecute(bar))
        hist.push(bar)
        his2=[...hist]
        bar = ""
        updateconsole()
        return 0
    }
    //cntrllock
    if (code=="=w") {
        let ns = shift
        if (ns==0) {shift=1}
        if (ns==1) {shift=2}
        if (ns==2) {shift=0}
        reindicate()
        return 0
    }
    //shift
    if (code=="=J") {
        keybshift[0]=1
        reindicate()
        return 0
    }
    //shiftlock
    if (code=="=m=J") {
        keybshift[1]=1-keybshift[1]
        reindicate()
        return 0
    }
    //cycle
    if (code==">,*,=w") {
        cyclestringver()
        updateconsole()
        build_keyb(keyb,'keyboard')
        build_keyb(numpadd,'numpad')
        reindicate()
        return 0
    }
    //prevfunk
    if (code=="^"&&shift>0) {
        if (his2.length>0) {
            bar=his2.pop()
            lowershift()
            updateconsole()
        }
        return 0
    }
    //predict
    if (code==">"&&shift>0) {
        reply("kX7.")
        return 0
    }
    //normal charcodes
    bar+=code
    keybshift[0]=0
    reindicate()
    updateconsole();
    return 0
}

function updateconsole() {
    let console = document.getElementById('console')
    console.innerHTML = ""

    //bar
    let bartext = document.createElement("div")
    bartext.classList.add("row")

    let toxt2 = displayAddressLoc(addressloc,1) + ",," +bar
    bartext.appendChild(document.createTextNode(convstring(toxt2)))

    console.appendChild(bartext)

    //rows
    for (let i = 0; i < rows.length; i++) {
        let row = document.createElement("div")
        row.classList.add("row")

        let toxt = rows[rows.length-i-1]
        // let toxt = rows[i]
        row.appendChild(document.createTextNode(convstring(toxt)))

        console.appendChild(row)
    }
    
        
}

function displayAddressLoc(address,wanttext) {
    //spits ,r and returns array or text
    let adressarray = address.split(',r')
    if (wanttext) {
        let toxt = adressarray[0]
        for (let i = 1; i < adressarray.length; i++) {
            toxt += "kw" + adressarray[i]
        }
        return toxt
    } else {
        return adressarray
    }
}

function reply(text) {
    rows.push(text)
}

function findbyaddress(address) {
    for (let i = 0; i < infotreearray.length; i++) {
        if (infotreearray[i][0]==address) {
            return i
        }
    }
    return "!"
}

function calcadress(reladdress) {
    let addressalt = displayAddressLoc(addressloc,0)
    let address0=reladdress.split("kw").reverse()
    console.log(addressalt);
    for (let i = 0; i < address0.length; i++) {
        let popped = address0.pop()
        if (popped=="") {
            if (addressalt.length>1) {
                addressalt.pop()
            }
        } else {
            address0.push(popped)
        }
    }
    console.log(addressalt);
    
    address0.reverse()
    for (let i = 0; i < address0.length; i++) {
        if (address0[i]!="") {
            addressalt.push(address0[i])
        }
    }
    console.log(addressalt);
    let address = addressalt[0]
    for (let i = 1; i < addressalt.length; i++) {
        address += ",r"+addressalt[i]
    }
    return address
}

function reindicate() {
    let koyb = [...indiK]; // Shallow copy
    koyb[0] = [...koyb[0], [emojconvnumer(shift), "i", ["l", 3]]]; // Modify the copy safely
    build_keyb(koyb, 'ind');
    if (keybshift[0]==keybshift[1]) {
        build_keyb(neokeyb,'keyboard')
    } else {
        build_keyb(neokeybalt,'keyboard')
    }
}

function lowershift() {
    if (shift==1) {shift=0}
    reindicate()
}