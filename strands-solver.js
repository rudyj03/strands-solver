// ==UserScript==
// @name     Strands-Solver
// @version  1
// @grant    none
// ==/UserScript==
  
async function clickButton(buttonNumber){
    return new Promise((resolve) => {
        setTimeout(async () => {
            let button = document.querySelector(`#button-${buttonNumber}`);
            button.click();
            resolve(button)
        }, 1000);
    })
}

async function clickCoords(coordinateArray){
    let index = 0;
    for(let coord of coordinateArray){
        let x = coord[0];
        let y = coord[1];
        let buttonNumber = ((x*6) + y);
        await clickButton(buttonNumber);
        if(index === coordinateArray.length - 1){
            await clickButton(buttonNumber);
        }
        index += 1;
    }
}

function formatDate(date) {
  // Get the year, month, and day from the date object
  const year = date.getFullYear();
  let month = date.getMonth() + 1; // Months are zero-based, so add 1
  let day = date.getDate();

  // Add leading zeros if necessary
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Concatenate into yyyy-mm-dd format
  return `${year}-${month}-${day}`;
}

window.addEventListener("load", async (event) => {
    let today = new Date()
    let dateString = today.toISOString().split('T')[0]
    let response = await fetch(`https://www.nytimes.com/svc/strands/v1/${formatDate(new Date())}.json`)
    const todaysAnswer = await response.json();
    document.querySelector('[class*=playButton]').click();
    let themes = todaysAnswer.themeCoords
    let spangramCoords = todaysAnswer.spangramCoords
    console.log("Solving Strands...");
    for(let theme in themes){
        let themeCoords = themes[theme];
        let index = 0;
        await clickCoords(themeCoords);
    }
    await clickCoords(spangramCoords);
});
  