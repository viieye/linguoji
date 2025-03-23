setTimeout(startup,50)

function startup() {
    rows=[]
    bar=""

    build_keyb(neokeyb,'keyboard')
    
    reindicate()
    build_keyb(numpadd,'numpad')

    updateconsole();
}