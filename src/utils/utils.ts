
export function getUUID(randomLength){
    return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
}