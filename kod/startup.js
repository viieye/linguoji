setTimeout(startup,50)

function startup() {
    rows=[]
    bar=""

    build_keyb(keyb2,'keyboard')
    
    reindicate()
    build_keyb(numpadd,'numpad')

    updateconsole();
}