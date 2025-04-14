const ezchar = `V?3*kpNQ=qMvEO8'Bb6r^<>h/@:HYxX90ydJL(Wwmg}{F7u#oz45Z&;%"ef!+$~,`
const emchar = ["🐷","❓","💚","✨","🪳","🤤","🎵","🌰","🏳️‍⚧️","😭","😂","✅","💀","😱","😳","😢","🤓","👍","👁️","👇","☝️","👈","👉","🫵","🖊️","🧠","🥺","🗺️","🔥","🤭","❌","🏆","👂","🤝","👌","🫸","🫷","🫶","🖖","🫴","✊","👊","🤜","🤛","🤟","✍️","👅","👑","💍","🐝","☘️","🍁","🎴","🍇","😉","🤦","👽","♥️","♠️","♦️","♣️","⚕️","🪢","🔳",]
const silebl = ["Po","Ki","Ca","Ci","Ri","Ne","Mu","Hi","Ra","Va","Ha","Ho","Da","Na","Vi","Ti","De","Ka","Ta","Ke","Ze","Ma","Ji","Xe","Pa","Mo","Ka","Ru","Ce","Pi","Ku","Ge","Se","He","Co","Mi","Me","Gu","Vu","Ga","Xi","Ja","Te","Qe","Ro","La","Pa","Gi","Go","Fu","Le","Qa","Fo","Ze","Qo","Sa","Cu","Si","Pe","Li","Xe","Je","Bu","Fe",]



const digits0 = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+';
const digits1 = [",","^","F","+","4","5","z","g"];
const digits2 = [",","~","#","*","9",];

var stringver = 2
const stringvers = 4
function cyclestringver() {stringver++;stringver=stringver%stringvers;return stringver}

function convchar(char) {
    for (let i = 0; i < emchar.length; i++) {
        if (char==ezchar[i]) {
            return (stringver==0)?emchar[i]:(stringver==1)?silebl[i]:ezchar[i]
        }
    }
    return char
}



function convstring(string) {
    let toxt = ""
    for (let i = 0; i < string.length; i++) {
        toxt+=convchar(string[i])
    }
    return toxt
}

function convnumer(decnum, radix) {
    if (radix < 2 || radix > digits0.length) {
        throw new Error("Radix must be between 2 and "+digits0.length);
    }

    if (radix > digits0.length) {
        throw new Error("Radix exceeds supported digit set length");
    }

    let result = '';
    let remainder;

    while (decnum > 0) {
        remainder = decnum % radix; // Find the remainder
        result = digits0[remainder] + result; // Map to custom digit and prepend
        decnum = Math.floor(decnum / radix); // Reduce the number
    }

    return result || '0'; // Handle the case for input 0
}

function paduntilleng(stringtopad,padtype,leng) {
    for (let i = stringtopad.length; i < leng; i++) {
        stringtopad=padtype+stringtopad
    }
    return stringtopad
}

//((num==0)?"d,":(num/8<1)?digits1[num%8]+",":digits2[Math.floor(num/8)]+digits1[num%8])
const digits40 = ["d,","^,","F,","+,","4,","5,","z,","g,","~,","~^","~F","~+","~4","~5","~z","~g","#,","#^","#F","#+","#4","#5","#z","#g","*,","*^","*F","*+","*4","*5","*z","*g","9,","9^","9F","9+","94","95","9z","9g",]

function emojconvnumer(decnum) {
    let bes40result = convnumer(decnum,40).split("")
    let ans = ""
    for (let i = 0; i < bes40result.length; i++) {
        let num = findbyel(digits0.split(""),bes40result[i])
        ans=ans+digits40[num]
    }
    return "z*"+ans
}

function coupleEmojs(string) {
    let couples = []
    for (let i = 0; i < string.length/2; i++) {
        couples.push(string[i*2]+string[i*2+1])
    }
    return couples;
}

function coupleSplit(couplearray,tomatch,ifconcat) {
    let resuarray = []
    let subarray = []
    for (let i = 0; i < couplearray.length; i++) {
        if (couplearray[i]==tomatch) {
            let altsubaray = subarray
            if (ifconcat==1) {
                altsubaray = konkat(subarray)
            }
            resuarray.push(altsubaray)
            subarray = []
        } else {
            subarray.push(couplearray[i])
        }
    }
    if (ifconcat==1) {
        subarray = konkat(subarray)
    }
    resuarray.push(subarray)
    return resuarray
}

function couplensplit(string,tomatch,ifconcat) {
    return coupleSplit(coupleEmojs(string),tomatch,ifconcat)
}

function emojto10(emojnum) {
    let numar = coupleEmojs(emojnum)
    console.log(numar);
    if (numar[0]=!"z*") {
        numar.unshift("z*");
    }
    console.log(numar);
    
    let num = 0
    numar=numar.reverse()
    for (let i = 1; i < numar.length; i++) {
        num+=findbyel(digits40,numar[i])*40**i
    }
    return num
}

function string2emojblock(string) {
    if (string.length) {
        
    }
}

//, is 63
const ezchar_plus = `V?3*kpNQ=qMvEO8'Bb6r^<>h/@:HYxX90ydJL(Wwmg}{F7u#oz45Z&;%"ef!+$~,|`
const ezchar_lexicon = [
    "000000",// V
    "000001",
    "000010",
    "000011",
    "000100",
    "000101",
    "000110",
    "000111",
    "001000",
    "001001",
    "001010",
    "001011",
    "001100",
    "001101",
    "001110",
    "001111",
    "010000",
    "010001",
    "010010",
    "010011",
    "010100",//^
    "010101",
    "010110",
    "010111",
    "011000",
    "011001",
    "011010",
    "011011",
    "011100",
    "011101",
    "011110",
    "011111",
    "100000",
    "100001",
    "100010",
    "100011",
    "100100",
    "100101",
    "100110",
    "100111",
    "101000",
    "101001",
    "101010",
    "101011",
    "101100",
    "101101",
    "101110",
    "101111",
    "110000",
    "110001",
    "110010",
    "110011",
    "110100",
    "110101",
    "110110",
    "110111",
    "111000",
    "111001",
    "111010",
    "111011",
    "111100",
    "111101",
    "111110",
    "111111",// ,
]

var datatedtree = conData2binr()

function conData2binr() {
    let toxt = ""
    let el = ezchar_lexicon
    for (let i = 0; i < infotreearray.length; i++) {
        toxt += el[64]+el[20]
    }
    return toxt
}

function refactorDatatedtree(dataoftree) {
    
} 