const drawZone = document.querySelector('#draw-zone')
const colorsContainer = document.querySelector('#colors')
const data = []
let actualColor = '#FFFFFF' // Cor inicial
let mousePress = false
let isErasing = false // Controle para o modo apagar

// Gera a zona de desenho
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

// Atualiza a cor selecionada
const setActualColor = (newColor) => {
    if (!isErasing) { // Apenas altera a cor se não estiver no modo apagar
        actualColor = newColor
    }
}

// Configura o evento do input de cor
const setColorPickerEvent = () => {
    const colorPicker = document.getElementById('color-picker')
    colorPicker.addEventListener('input', (e) => {
        setActualColor(e.target.value)  // Atualiza a cor ao selecionar
    })
}

// Alterna entre modo apagar e modo desenhar
const toggleEraseMode = () => {
    isErasing = !isErasing
    const eraseButton = document.getElementById('erase-btn')
    if (isErasing) {
        eraseButton.style.backgroundColor = '#C9302C'
        eraseButton.innerText = 'Desenhar'
    } else {
        eraseButton.style.backgroundColor = '#D9534F'
        eraseButton.innerText = 'Apagar'
    }
}

// Configura o evento de clicar no botão de apagar
const setEraseButtonEvent = () => {
    const eraseButton = document.getElementById('erase-btn')
    eraseButton.addEventListener('click', toggleEraseMode)
}

// Configura eventos de mouse
const mouseEvents = () => {
    document.addEventListener('mousedown', (e) => {
        e.preventDefault();
        mousePress = true
    })
    document.addEventListener('mouseup', (e) => mousePress = false)
}

const setPixel = (i, j, newValue = actualColor) => {
    if (isErasing) {
        newValue = null // Apaga o pixel se estiver no modo apagar
    }
    data[i][j] = newValue
    const pixel = document.getElementById(`i${i}j${j}`)
    if (newValue != null) {
        pixel.style.backgroundColor = newValue
    } else {
        pixel.style.backgroundColor = 'transparent'
    }
    pixel.style.opacity = '1'
}

const hover = (i, j, newValue = actualColor) => {
    if (mousePress == true) {
        setPixel(i, j, newValue)
        return
    }
    if (data[i][j] != null) return;
    const pixel = document.getElementById(`i${i}j${j}`)
    if (isErasing) {
        pixel.style.backgroundColor = 'transparent'
        pixel.style.opacity = '0.5'
    } else {
        pixel.style.backgroundColor = newValue
        pixel.style.opacity = '0.5'
    }
}

const leave = (i, j) => {
    const pixel = document.getElementById(`i${i}j${j}`)
    if (data[i][j] != null) pixel.style.backgroundColor = data[i][j]
    else pixel.style.backgroundColor = 'transparent'
    pixel.style.opacity = '1'
}

generateDrawZone()
mouseEvents()
setColorPickerEvent()  // Configura o evento do color picker
setEraseButtonEvent()  // Configura o evento do botão de apagar

// Gerar Array
const generateArray = () => {
    const dataStr = JSON.stringify(data)
    console.log(data);
    navigator.clipboard.writeText(dataStr)
        .then(() => alert('Código copiado para a área de transferência!'))
        .catch(err => alert('Erro ao copiar: ' + err))
}

const pasteFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText()
        const pasted = JSON.parse(text)

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                data[i][j] = pasted[i][j]
                const pixel = document.getElementById(`i${i}j${j}`)
                if (pasted[i][j]) {
                    pixel.style.backgroundColor = pasted[i][j]
                    pixel.style.opacity = '1'
                } else {
                    pixel.style.backgroundColor = 'transparent'
                    pixel.style.opacity = '1'
                }
            }
        }
        alert('Código colado com sucesso!')
    } catch (err) {
        alert('Erro ao colar: ' + err.message)
    }
}

// Opções
let btnVisible = false

const setBtnEvents = () => {
    document.getElementById('ops').addEventListener('click', () => setVisibleBtn())
    document.querySelector('.generate-btn').addEventListener('click', () => generateArray())
    document.querySelector('.test-btn').addEventListener('click', () => pasteFromClipboard())
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
