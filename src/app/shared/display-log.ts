export const displayLog = (content: string)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    logContainer!!.appendChild(element);
}

export const updateDisplay = (content: string)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container")!!;
    while(logContainer.firstChild){
        logContainer.removeChild(logContainer.firstChild);
    }
    logContainer.appendChild(element);
}