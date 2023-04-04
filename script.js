//desenho

const drawZone = document.querySelector('#draw-zone')
const colorsContainer = document.querySelector('#colors')
const data = []
const colors = ['000000', '555555', 'AAAAAA', 'FFFFFF', '800000', '8B0000', 'B22222', 'A52A2A', 'FF8C00', 'FFD700', 'FFFF00', 'F0E68C', '008000', '228B22', '32CD32', '00FF00', '0000FF', '6495ED', '4169E1', '1E90FF', null]
let actualColor = 'FFFFFF'
let mousePress = false

const generateDrawZone = () => {
    for (let i = 0; i < 20; i++) {
        data.push([])
        for (let j = 0; j < 20; j++) {
            data[i].push(null)
            let pixel = document.createElement('div')
            pixel.setAttribute('class', 'pixel')
            pixel.setAttribute('id', `i${i}j${j}`)
            pixel.addEventListener('mousedown', (e) => setPixel(i, j))
            pixel.addEventListener('mouseenter', (e) => hover(i, j))
            pixel.addEventListener('mouseleave', (e) => leave(i, j))
            drawZone.appendChild(pixel)
        }
    }
}

const generateColors = () => {
    colors.forEach(color => {
        let colorElement = document.createElement('div')
        colorElement.setAttribute('class', 'color')
        if (color == actualColor) colorElement.classList.add('active')
        if (color == null) {
            const text = document.createTextNode("x");
            colorElement.appendChild(text);
            colorElement.classList.add('eraser')
        }
        else colorElement.setAttribute('style', `background-color: #${color};`)
        colorElement.addEventListener('click', (e) => setActualColor(color, colorElement))
        colorsContainer.appendChild(colorElement)
    });
}

const mouseEvents = () => {
    document.addEventListener('mousedown', (e) => {
        e.preventDefault();
        mousePress = true
    })
    document.addEventListener('mouseup', (e) => mousePress = false)
}

const setActualColor = (newColor, element) => {
    actualColor = newColor
    const oldActive = colorsContainer.querySelector('.active')
    if (oldActive) oldActive.classList.remove('active')
    element.classList.add('active')
}

const setPixel = (i, j, newValue = actualColor) => {
    data[i][j] = newValue
    const pixel = document.getElementById(`i${i}j${j}`)
    if (newValue != null) pixel.style.backgroundColor = `#${newValue}`
    else pixel.style.backgroundColor = 'transparent'
    pixel.style.opacity = '1'
}

const hover = (i, j, newValue = actualColor) => {
    if (mousePress == true) {
        setPixel(i, j, newValue)
        return
    }
    if (data[i][j] != null) return;
    const pixel = document.getElementById(`i${i}j${j}`)
    pixel.style.backgroundColor = `#${newValue}`
    pixel.style.opacity = '0.5'
}

const leave = (i, j) => {
    const pixel = document.getElementById(`i${i}j${j}`)
    if (data[i][j] != null) pixel.style.backgroundColor = `#${data[i][j]}`
    else pixel.style.backgroundColor = 'transparent'
    pixel.style.opacity = '1'
}

generateDrawZone()
generateColors()
mouseEvents()

//gerar Array

const generateArray = () => {
    const dataStr = JSON.stringify(data)
    console.log(data);
}


// opções

let btnVisible = false

const setBtnEvents = () => {
    document.getElementById('ops').addEventListener('click', () => setVisibleBtn())
    document.querySelector('.generate-btn').addEventListener('click', () => generateArray())
}

const setVisibleBtn = () => {
    const opBtns = document.querySelectorAll('.op-btn')
    if (!btnVisible) {
        btnVisible = true
        opBtns.forEach((btn) => btn.classList.add('btn-visible'))
    }
    else {
        btnVisible = false
        opBtns.forEach((btn) => btn.classList.remove('btn-visible'))
    }
}

setBtnEvents()