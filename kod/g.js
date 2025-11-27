var cache_register = new Array(16).fill(new Array(8).fill(0))
var great_register = new Array(256).fill(new Array(8).fill(0))
var nands_used = 0

function nand(a,b) {
    let b1 = a>0?1:0
    let b2 = b>0?1:0
    return 1-b1*b2
}
// function nand(a,b) {nands_used++;return 1-a*b}
function not(a) {return nand(a,a)}
function and(a,b) {let c=nand(a,b);return nand(c,c)}
function or(a,b) {return nand(nand(a,a),nand(b,b))}
function nor(a,b) {let d=nand(nand(a,a),nand(b,b));return nand(d,d)}
function xor(a,b) {let c=nand(a,b);return nand(nand(a,c),nand(b,c))}
//halfadder
function had(a,b) {let c=nand(a,b);return [nand(nand(a,c),nand(b,c)),nand(c,c)]}
function mul(a,b,c) {return nand(nand(a,nand(c,c)),nand(b,c))}
//fulladder
function fad(a,b,c) {
    let d=nand(a,b);
    let t=nand(nand(a,d),nand(b,d));
    let f=nand(c,t);
    return [nand(nand(c,f),nand(t,f)),nand(d,f)]
}
function fad_8b(a8b,b8b) {
    let c = 0
    let ans = new Array(8).fill(0)
    for (let i = 0; i < 8; i++) {
        let ans2 = fad(a8b[7-i]*1,b8b[7-i]*1,c)
        ans[7-i]=ans2[0]
        c=ans2[1]
    }
    return ans
}
function neg_8b(a8b) {
    let ans = new Array(8).fill(0)
    for (let i = 0; i < 8; i++) {
        ans[7-i]=not(a8b[7-i])
    }
    return fad_8b(ans,[0,0,0,0,0,0,0,1])
}
function cnc_8b(a4b,b4b) {return [a4b[0],a4b[1],a4b[2],a4b[3],b4b[0],b4b[1],b4b[2],b4b[3]]}
function mul_4b(a4b,b4b,num) {
    let ans = new Array(4).fill(0)
    for (let i = 0; i < 4; i++) {
        ans[3-i]=mul(a4b[3-i],b4b[3-i],num)
    }
    return ans
}
function mul_8b(a8b,b8b,num) {
    let ans = new Array(8).fill(0)
    for (let i = 0; i < 8; i++) {
        ans[7-i]=mul(a8b[7-i],b8b[7-i],num)
    }
    return ans
}
function alu(a,b,cout,d6b) {
    //d6b is d10b now
    let ans = mul(
        fad(
            mul(a,not(a),d6b[0]),
            mul(b,not(b),d6b[1]),
            mul(cout,1,d6b[3])
        )[0],
        xor(
            or(
                mul(a,not(a),d6b[0]),
                mul(b,not(b),d6b[1]),
            ),d6b[3]
        ),
        d6b[4]
    )
    return [ans,fad(mul(a,not(a),d6b[0]),mul(b,not(b),d6b[1]),mul(cout,1,d6b[3]))[1]]
}
function alu_8b(a8b,b8b,d6b,c8b) {
    //c8b is for dumping data in

    //0 flip a
    //1 flip b
    //2 c0=
    //3 c=1 //makes it an xnor
    //4 or
    //5 rshift
    //6 data mux
    //7 destination mux to r1 not r3
    //8 
    //9 add data to b8b is now c8b?

    let cout = d6b[2]
    let ans = new Array(8).fill(0)
    for (let i = 0; i < 8; i++) {
        let loc = 7-i
        let ans2 = alu(
            a8b[loc],
            mul(b8b[loc],c8b[loc],d6b[9]),
            cout,
            d6b
        )
        ans[7-i]=ans2[0]
        cout=ans2[1]
    }
    let rans = [0]
    for (let i = 0; i < 7; i++) {
        rans.push(ans[i]*1)
    }
    return mul_8b(ans,rans,d6b[5])
}

function x4b2d5b(a4b) {
    //000000 add
    //011000 subtract
    //000100 xnor/=
    //010100 xor
    //000010 or
    //000110 nor
    //110010 nand
    //110110 and
    //000001 shift rigth
    //100010 implies
    //100110 nimplies
}

function control_rom(i16b) {
    console.log(i16b);
    
    //first 4 bits are opcode
    let opp = [[[[
        [0,0,0,0,0,0,0,0,0,0]//noop
    ],[
        [1,0,0,0,0,0,0,0,0,0],//add
        [1,0,1,1,0,0,0,0,0,0]//subtract
    ]],[[
        [1,0,0,0,1,1,0,0,0,0],//nor
        [1,1,1,0,1,1,0,0,0,0],//and
    ],[
        [1,0,1,0,1,0,0,0,0,0],//xor
        [1,0,0,0,0,0,1,0,0,0],//rshift
    ]]],[[[
        [1,0,0,0,0,0,0,1,1,0],//ldi
        [1,0,0,0,0,0,0,0,0,1],//adi
    ]]]]
    
    let ouropp = opp[i16b[0]][i16b[1]][i16b[2]][i16b[3]]
    let registry = register(
        num2e2_8b(0),
        [i16b[4],i16b[5],i16b[6],i16b[7]],
        [i16b[8],i16b[9],i16b[10],i16b[11]],
        [i16b[12],i16b[13],i16b[14],i16b[15]],
        0,0,0
    )
    register(
        alu_8b(
            registry[0],
            registry[1],
            [ouropp[1],ouropp[2],ouropp[3],ouropp[4],ouropp[5],ouropp[6],ouropp[7],ouropp[8],ouropp[9]],
            [i16b[8],i16b[9],i16b[10],i16b[11],i16b[12],i16b[13],i16b[14],i16b[15]],    
        ),
        [i16b[4],i16b[5],i16b[6],i16b[7]],
        [i16b[8],i16b[9],i16b[10],i16b[11]],
        [i16b[12],i16b[13],i16b[14],i16b[15]],
        ouropp[0],[ouropp[7],ouropp[8]],ouropp[9]
    )
}

function register(d8b,a4b,b4b,c4b,e1b,m2b,f1b) {
    cache_register[0].fill(0)
    // i wouldhave put a nand mul here but its 4 bit and im lazy to make a mub4b for this
    //120250325: ???? huh? what is this about, binary to decimal?
    let r1 = b4b2dec(a4b)
    let r2 = b4b2dec(b4b)

    //cache register resigters at b4b2dec(c4b) (linguoji numeral to nromal from 4bit-c-input)
    //if e1b
    ///cache register
    ////if m2bit-N2
    /////c4b
    /////a4b
    ///if m2bit-N1
    ////if f1b
    /////d8b

    ////concat8bit b4bit ; c4bit
    cache_register[b4b2dec(c4b)]=
        mul_8b(
            cache_register[b4b2dec(mul_4b(c4b,a4b,m2b[1]))],
            mul_8b(
                d8b,
                cnc_8b(b4b,c4b),//this is LDI, it loads into file
                m2b[0]),
            e1b);
    if (e1b==1) {
        console.log(cache_register[b4b2dec(c4b)])
        console.log([c4b,d8b])
    }
    cache_register[0].fill(0)
    return [cache_register[r1],cache_register[r2]]
}









function num2e2_8b(num) {
    let ans = new Array(8).fill(0)
    let num2 = num*1
    for (let i = 0; i < 8; i++) {
        ans[7-i]=num2%2
        num2 = Math.floor(num2/2)
    }
    return ans
}

function b8b2dec(a8b) {
    return 1*a8b[7]+2*a8b[6]+4*a8b[5]+8*a8b[4]+16*a8b[3]+32*a8b[2]+64*a8b[1]+128*a8b[0]
}

function b4b2dec(a4b) {
    return 1*a4b[3]+2*a4b[2]+4*a4b[1]+8*a4b[0]
}

function compilero(codestring) {
    //splits string into lines
    let lines = couplensplit(codestring,",r",1)
    let mechcode = []
    for (let ind = 0; ind < 1024; ind++) {
        let text = "X,"
        console.log(lines[ind])
        if (typeof lines[ind] != "undefined") {
            text = couplensplit(lines[ind],",,",1)
        }
        let oppecode = "0000";
        let reg1code = "0000";
        let reg2code = "0000";
        let reg3code = "0000";
        if (text[0]=="X,") {//nop
            oppecode = "0000"
        }
        if (text[0]=="}E") {//hlt
            oppecode = "0001"
        }
        if (text[0]=="ww") {//add
            oppecode = "0010"
        }
        if (text[0]=="wm") {//sub
            oppecode = "0011"
        }
        if (text[0]=="X?") {//nor
            oppecode = "0100"
        }
        if (text[0]=="m}") {//and
            oppecode = "0101"
        }
        if (text[0]=="}H") {//xor
            oppecode = "0110"
        }
        if (text[0]=="}F") {//rxf
            oppecode = "0111"
        }
        if (text[0]=="6H") {//ldi
            oppecode = "1000"
        }
        if (text[0]=="J*") {//adi
            oppecode = "1001"
        }
        if (text.length>1) {
            let ans = emojto10(text[1])
            reg1code = paduntilleng(convnumer(ans, 2),"0",4)
        }
        if (text.length>2) {
            let ans = emojto10(text[2])
            reg2code = paduntilleng(convnumer(ans, 2),"0",4)
        }
        if (text.length>3) {
            let ans = emojto10(text[3])
            reg3code = paduntilleng(convnumer(ans, 2),"0",4)
        }

        //semipseudocodes
        if (text[0]=="6H") {//ldi
            oppecode = "1000"
            let ans = emojto10(text[1])
            reg1code = paduntilleng(convnumer(ans, 2),"0",4)
            ans = emojto10(text[2])
            reg2code = paduntilleng(convnumer(Math.floor(ans/256), 2),"0",4)
            reg3code = paduntilleng(convnumer(ans%256, 2),"0",4)
        }
        if (text[0]=="J*") {//adi
            oppecode = "1001"
            let ans = emojto10(text[1])
            reg1code = paduntilleng(convnumer(ans, 2),"0",4)
            ans = emojto10(text[2])
            reg2code = paduntilleng(convnumer(Math.floor(ans/256), 2),"0",4)
            reg3code = paduntilleng(convnumer(ans%256, 2),"0",4)
        }

        //pesudocodes
        if (text[0]=="{F") {//lxf
            //uses add of the same 2 numbers and 
            oppecode = "0010"
            let ans = emojto10(text[1])
            reg1code = paduntilleng(convnumer(ans, 2),"0",4)
            reg2code = paduntilleng(convnumer(ans, 2),"0",4)
            reg3code = paduntilleng(convnumer(ans, 2),"0",4)
        }
        mechcode.push((oppecode+reg1code+reg2code+reg3code).split(""))
    }
    return mechcode
}
var codr = "6H,,z*^,,,z*^,"
var anddress_memory = []

function run_program() {
  console.log("compiling")
    anddress_memory = compilero(codr)

    let p10b = 0
    for (let i = 0; i < anddress_memory.length; i++) {
        control_rom(anddress_memory[i])
    }
    console.log(cache_register);
}

setTimeout(run_program,500)

var hex = [[
  [["0","1"],["2","3"]],
  [["4","5"],["6","7"]]],
  [[["8","9"],["A","B"]],
  [["C","D"],["E","F"]]
]]

function bindisphx(binar) {
  let bu4 = []
  let ans = ""
  let i=0
  while (i<binar.length) {
    bu4.push(binar[i])
    if (bu4.length==4) {
      ans += hex[bu4[0]][bu4[1]][bu4[2]][bu4[3]]
      bu4=[]
    }
    i++
  }
  if (bu4.length!=0) {
    let altbu = []
    altbu= bu4.reverse()
    while (altbu.length<4) {
      altbu.push(0)
    }
    bu4=altbu.reverse()
    ans += hex[bu4[0]][bu4[1]][bu4[2]][bu4[3]]
  }
  return ans
}

function printreg() {
  let anstx = ""
  let i = 0
  while (i<cache_register.length) {
    anstx += bindisphx(cache_register[i])
    if (i%4==3) {anstx+=" "}
    if (i%16==15) {anstx+="\n"}
    i++
  }  
  console.log(anstx)
}

setTimeout(printreg,505)
