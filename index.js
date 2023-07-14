/* Create table depending on the selected grid size */
const selectGridSize = document.querySelector('.welcomeDiv select');
const playArea = document.querySelector('.playArea');
const table = playArea.querySelector('table');
const checkSolutionBtn = table.nextElementSibling;
const dialog = checkSolutionBtn.nextElementSibling;
const resultPara = dialog.querySelector('p');
const closeBtn = resultPara.nextElementSibling;
let row, col, input, caption, sum, inputs, index, tempSum, flag;
createTable(3);

selectGridSize.addEventListener('change', () => createTable(Number(selectGridSize.value)));

function createTable(size) {
    table.innerHTML = "";
    for (let r = 0; r < size; r++) {
        row = document.createElement('tr');
        for (let c = 0; c < size; c++) {
            col = document.createElement('td');
            input = document.createElement('input');
            input.setAttribute('type', 'number');
            col.appendChild(input);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    caption = document.createElement('caption');
/* Fomrula for sum = n(n**2 + 1)/2 */
    sum = (size * (size ** 2 + 1)) / 2;
    caption.innerHTML = `Sum = ${sum}`;
    table.appendChild(caption);
}

/* Check Solution */
checkSolutionBtn.addEventListener('click', () => {
    flag = true;
    inputs = table.querySelectorAll('input');
    index = 0;
    /* Sum of each row */
    for (let r = 0; r < Number(selectGridSize.value); r++) {
        tempSum = 0;
        for (let c = 0; c < Number(selectGridSize.value); c++) {
            tempSum += Number(inputs[index].value);
            index++;
        }
        if (tempSum !== sum) {
            flag = false;
        }
    }

    /* Sum of each col */
    for (let c = 0; c < Number(selectGridSize.value); c++) {
        index = c;
        tempSum = 0;
        for (let r = 0; r < Number(selectGridSize.value); r++) {
            tempSum += Number(inputs[index].value);
            index = c + Number(selectGridSize.value) * (r + 1);
        }
        if (tempSum !== sum) {
            flag = false;
        }
    }

    /* Sum of each diagonal */
    /* Left to right */
    index = 0;
    tempSum = 0;
    for (let c = 0; c < Number(selectGridSize.value); c++) {
        tempSum += Number(inputs[index].value);
        index = (c + 1) + (Number(selectGridSize.value) * (c + 1));
    }
    if (tempSum !== sum) {
        flag = false;
    }

    /* Right to left */
    tempSum = 0;
    index = Number(selectGridSize.value) - 1;
    for (let c = 0; c < Number(selectGridSize.value); c++) {
        tempSum += Number(inputs[index].value);
        index += Number(selectGridSize.value) - 1;
    }
    if (tempSum !== sum) {
        flag = false;
    }

    if (flag === false) {
        resultPara.innerHTML = "Sorry! Your solution is incorrect.";
    }
    else {
        resultPara.innerHTML = "Congratulations! Your solution is correct.";
    }

    dialog.style.display = "flex";
    dialog.style.height = `${playArea.clientHeight + (document.querySelector('.welcome')).clientHeight}px`;
});

closeBtn.addEventListener('click', () => dialog.style.display = "none");

/* Set the current year in footer */
let year = document.querySelector('footer span');
year.textContent = new Date().getFullYear();
