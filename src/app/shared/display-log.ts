export const displayLog = (content: string)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    logContainer!!.appendChild(element);
}