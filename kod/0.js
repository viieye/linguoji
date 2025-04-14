//yusefunk emoj.1
function isin(el,array) {
    let is = false
    for (let i = 0; i < array.length; i++) {
        if (array[i]==el) {is=true}
    }
    return is
}

function rund(nearlythis) {
    return Math.floor(Math.random()*nearlythis)
}
function araranid(array) {
    return Math.floor(Math.random()*array.length)
}
function araranel(array) {
    return array[Math.floor(Math.random()*array.length)]
}

function findbyel(arrag,el) {
    for (let i = 0; i < arrag.length; i++) {
        if (el==arrag[i]) {
            return i
        }
    }
    return -1
}

function konkat(array) {
    strug=""
    for (let i = 0; i < array.length; i++) {
        strug+=array[i]
    }
    return strug
}