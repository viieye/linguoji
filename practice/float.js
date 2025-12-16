setTimeout(main,50)
var hoch = 0


// flaot 16 is [0](1) for sign, [1-6](6) for power [7-15](9) number
const frang = [1,7,16]

function rund(num) {
    return Math.floor(Math.random()*num)
}

function runb(mag) {
    return dec2binar(rund(2**mag))
}

function padar(ar,max,padit) {
    
}

function dec2binar(decnum) {
    let mag = 0
    let ansar = []
    while (decnum>2**mag) {
        mag++
    }
    let i =0
    while (mag-i>-1) {
        if (decnum<2**(mag-i)) {
            ansar.push(0)
        } else {
            decnum=decnum-2**(mag-i)
            ansar.push(1)
        }
        i++
    }
    let revar = ansar.reverse()
    let van = 0
    while (van==0) {
        let trough = 0
        if (revar.length>1) {
            trough = revar.pop()
        } else {van=1} 
        if (trough==1) {
            van=1
            revar.push(1)
        }
    }
    ansar = revar.reverse()
    return ansar
}

function float(binint) {


}

function arsect(ar,ss,es) {
    let aa = []
    for (let i = ss; i < es; i++) {
        aa.push(ar[i])
    }
    return aa
}

//idk what i did but how is this so cursed
function binar2dec(binar) {
    let dec = 0.5
    for (let i = 0; i < binar.length; i++) {
        dec+=2**(binar.length-i-2)
    }
    return dec
}

function bflot(bflotarr) {
    let sig = bflotarr[0]
    let mant = binar2dec(arsect(bflotarr,frang[1],frang[2]))
    let numb = binar2dec(arsect(bflotarr,frang[2],frang[3]))
    return (1-2*sig)*(2**mant)*(numb)
}


function main() {
    console.log(hoch);
    let dec = rund(100)
    let bin = dec2binar(dec)

    console.log(dec);
    console.log(bin);
    
    let rbn = runb(16)
    let dcr = bflot(rbn)
    console.log(rbn,dcr);
    
    
}