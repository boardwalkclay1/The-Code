// =========================================================
// MATRIX AR ENGINE + TERMINAL SWITCHING (ALL-IN-ONE)
// =========================================================

let video, overlay, rainCanvas, ctx, rainCtx
let width, height
let running = true

// DIGITAL RAIN CHARACTERS
const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let rainColumns = []
let rainSpeed = 60

// =========================================================
// PUBLIC ENTRY POINT — CALL THIS FROM ANY TERMINAL
// =========================================================
export function runMatrixAR() {
    const terminal = document.getElementById("terminal")
    const ar = document.getElementById("matrix-ar")

    // hide terminal, show AR
    terminal.classList.add("hidden")
    ar.classList.remove("hidden")

    // start AR engine
    startMatrixAR()

    // back button logic
    document.getElementById("backToTerminal").onclick = () => {
        stopMatrixAR()
        ar.classList.add("hidden")
        terminal.classList.remove("hidden")
    }
}

// =========================================================
// START AR MODE
// =========================================================
function startMatrixAR() {
    video = document.getElementById("camera")
    overlay = document.getElementById("overlay")
    rainCanvas = document.getElementById("rain")

    ctx = overlay.getContext("2d")
    rainCtx = rainCanvas.getContext("2d")

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream
    })

    setupRain()
    loop()
    rainLoop()
    setupControls()
}

// =========================================================
// STOP AR MODE (cleanup)
// =========================================================
function stopMatrixAR() {
    running = false

    if (video && video.srcObject) {
        let tracks = video.srcObject.getTracks()
        tracks.forEach(t => t.stop())
    }
}

// =========================================================
// DIGITAL RAIN SETUP
// =========================================================
function setupRain() {
    width = rainCanvas.width = window.innerWidth
    height = rainCanvas.height = window.innerHeight

    const columns = Math.floor(width / 20)
    rainColumns = new Array(columns).fill(0)
}

// =========================================================
// DIGITAL RAIN LOOP
// =========================================================
function rainLoop() {
    if (!running) return

    rainCtx.fillStyle = "rgba(0, 0, 0, 0.05)"
    rainCtx.fillRect(0, 0, width, height)

    rainCtx.fillStyle = "#00ff41"
    rainCtx.font = "20px monospace"

    rainColumns.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)]
        rainCtx.fillText(text, i * 20, y)

        if (y > height || Math.random() > 0.95) {
            rainColumns[i] = 0
        } else {
            rainColumns[i] += rainSpeed
        }
    })

    requestAnimationFrame(rainLoop)
}

// =========================================================
// MAIN AR LOOP
// =========================================================
function loop() {
    if (!running) return

    overlay.width = window.innerWidth
    overlay.height = window.innerHeight

    ctx.drawImage(video, 0, 0, overlay.width, overlay.height)

    if (document.getElementById("toggleEdges").checked) {
        applyNeonEdges()
    }

    if (document.getElementById("toggleGlitch").checked) {
        applyGlitch()
    }

    updateHUD()

    requestAnimationFrame(loop)
}

// =========================================================
// NEON EDGE DETECTION
// =========================================================
function applyNeonEdges() {
    const frame = ctx.getImageData(0, 0, overlay.width, overlay.height)
    const data = frame.data

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3
        data[i] = 0
        data[i+1] = avg > 80 ? 255 : 0
        data[i+2] = 0
    }

    ctx.putImageData(frame, 0, 0)
}

// =========================================================
// GLITCH EFFECT
// =========================================================
function applyGlitch() {
    const sliceHeight = 5
    for (let y = 0; y < overlay.height; y += sliceHeight) {
        const offset = Math.random() * 20 - 10
        ctx.drawImage(
            overlay,
            0, y, overlay.width, sliceHeight,
            offset, y, overlay.width, sliceHeight
        )
    }
}

// =========================================================
// HUD UPDATES
// =========================================================
function updateHUD() {
    document.getElementById("matrix-ar-fps").textContent =
        "FPS: " + Math.floor(60 + Math.random() * 5)

    document.getElementById("matrix-ar-target").textContent =
        "OBJECT-" + Math.floor(Math.random() * 999)

    document.getElementById("matrix-ar-depth").textContent =
        (Math.random() * 5).toFixed(2) + " m"

    document.getElementById("matrix-ar-vector").textContent =
        "[" + (Math.random()*2-1).toFixed(2) + ", " + (Math.random()*2-1).toFixed(2) + "]"
}

// =========================================================
// UI CONTROLS
// =========================================================
function setupControls() {
    document.getElementById("rainSpeedSlider").oninput = e => {
        rainSpeed = Number(e.target.value)
    }

    document.getElementById("matrix-ar-pause").onclick = () => {
        running = !running
        if (running) {
            loop()
            rainLoop()
        }
    }

    document.getElementById("matrix-ar-snapshot").onclick = () => {
        const link = document.createElement("a")
        link.download = "matrix_snapshot.png"
        link.href = overlay.toDataURL()
        link.click()
    }
}
