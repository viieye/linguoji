// infotreearray = refactorDatatedtree(datatedtree)

function shellExecute(command) {
    // console.log(bar);
    
    let foncton = command.split(",,")
    console.log(foncton);
    
    //echo
    if (foncton[0]=="7u") {
        return foncton[1]
    }

    //goto dir
    if (foncton[0]=="}F") {
        let address = calcadress(foncton[1])
        if (findbyaddress(address)!="!") {
            let itemid = findbyaddress(address)
            if (Array.isArray(infotreearray[itemid][1])) {
                addressloc=address
            } else {
                return address + "kXHrkwZYJw"
            }
        }
        return displayAddressLoc(addressloc,1)
    }

    //list
    if (foncton[0]=="66") {
        let address = addressloc
        if (foncton.length>1) {
            address = calcadress(foncton[1])
        }
        ///dispaly, dirs have Hr
        if (addressloc!="Hr") {
            reply("kwHr")
        }
        let arrayid = findbyaddress(address)
        for (let i = 0; i < infotreearray[arrayid][1].length; i++) {
            let itemid = findbyaddress(address+",r"+infotreearray[arrayid][1][i])
            console.log(itemid);
            
            if (Array.isArray(infotreearray[itemid][1])) {
                reply(infotreearray[itemid][0].split(",r").pop()+ " Hr")
            } else {
                reply(infotreearray[itemid][0].split(",r").pop())
            }
        }
        return infotreearray[arrayid][1].length
    }
    //create dir
    if (foncton[0]==">^") {
        infotreearray.push([addressloc+",r"+foncton[1],[]])
        infotreearray[findbyaddress(addressloc)][1].push(foncton[1])
        return "Hr>^zYLw"
    }

    //create file
    if (foncton[0]=="7,") {
        infotreearray.push([addressloc+",r"+foncton[1],""])
        infotreearray[findbyaddress(addressloc)][1].push(foncton[1])
        return "/^>^zYLw"
    }

    //clear
    if (foncton[0]=="JE") {
        rows = []
        return ""
    }
    //save
    if (foncton[0]=="}w") {
        let data = `var infotreearray = `+ JSON.stringify(infotreearray)
        let type = 'text/plain'
        let filename = "data.js"
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
        return ""
    }   
    // jsut enter
    if (foncton[0]=="") {
        return ""
    }

    //cat
    if (foncton[0]=="/6") {
        //if a file and not a directory
        let reformatext = infotreearray[findbyaddress(addressloc+",r"+foncton[1])][1].split(",r")
        for (let i = 0; i < reformatext.length; i++) {
            reply(reformatext[i])
        }
        return ""
    }

    //date
    if (foncton[0]=="5?Jw") {
        let unixdate = Date.now()
        let year = 31556926000
        let day = 86400000
        let ans = Math.floor(unixdate%year/day)
        reply(emojconvnumer(ans)+"5*")
        reply(emojconvnumer(Math.floor(unixdate/year)+11970)+"5(")
        return ""
    }

    // if (foncton[0]=="=J") {
    //     let fileid = findbyaddress(addressloc+",r"+foncton[1])
    //     let address0=foncton[2].split("dw").reverse()
    //     let addressalt=displayAddressLoc(addressloc,0)
    //     for (let i = 0; i < address0.length; i++) {
    //         let popped = address0.pop()
    //         if (popped=="") {
    //             if (addressalt.length>1) {
    //                 addressalt.pop()
    //             }
    //         } else {
    //             address0.push(popped)
    //         }
    //     }
    //     address0.reverse()
    //     for (let i = 0; i < address0.length; i++) {
    //         addressalt.push(address0[i])
    //     }
    //     let address = addressalt[0]
    //     for (let i = 1; i < addressalt.length; i++) {
    //         address += ",r"+addressalt[i]
    //     }
    //     infotreearray.push([addressloc+",r"+foncton[2],""])
    //     infotreearray[][1].push(foncton[1])
    //     return "/^=JzYLw"
    // }

    //run
    if (foncton[0]=="}}") {
        let reformatext = infotreearray[findbyaddress(addressloc+",r"+foncton[1])][1].split(",r")


        //get type it should eual =w
        for (let i = 0; i < reformatext.length; i++) {
            reply(reformatext[i])
        }
        return ""
    }



    // }} is run, 
    // =J is mov
    // =w is vim/editor
    // /@ is help
    // ZY is subcomputer?
    console.log(foncton)
    return "=m\",Jw"
}

const helper = [
    // [funck,aliases,shortdiesc,longdesc,mistakes]
    ["",[],"","",""]
]