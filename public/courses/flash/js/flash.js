// flashEngine.js
// Cinematic Flash Learning Engine for Terminal-2
// Reads flash .txt files, parses words, and flashes them with speed + intensity + ramping.

async function loadFlashLesson(category, lessonName) {
    // Example path: flash/computers/lesson1-free.txt
    const path = `flash/${category}/${lessonName}.txt`;

    const res = await fetch(path);
    if (!res.ok) {
        console.error("Flash file not found:", path);
        return null;
    }

    const text = await res.text();
    return parseFlashFile(text);
}

function parseFlashFile(text) {
    const lines = text.split("\n");
    const words = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("===")) continue;

        // Example line:
        // computer [speed: slow] [intensity: soft]
        const parts = trimmed.split("[");
        const word = parts[0].trim();

        let speed = "medium";
        let intensity = "soft";

        for (const part of parts.slice(1)) {
            const segment = part.replace("]", "").trim();
            if (segment.startsWith("speed:")) {
                speed = segment.replace("speed:", "").trim();
            } else if (segment.startsWith("intensity:")) {
                intensity = segment.replace("intensity:", "").trim();
            }
        }

        if (word) {
            words.push({ word, speed, intensity });
        }
    }

    return words;
}

// Core flash player
function playFlashLesson(words, totalDurationMs, outputElementId = "flash-output", onEnd = null) {
    if (!words || !words.length) return;

    const el = document.getElementById(outputElementId);
    if (!el) {
        console.error("Flash output element not found:", outputElementId);
        return;
    }

    const start = performance.now();
    let index = 0;

    function loop(now) {
        const elapsed = now - start;
        if (elapsed >= totalDurationMs) {
            clearFlash(el);
            if (typeof onEnd === "function") onEnd();
            return;
        }

        const { word, speed, intensity } = words[index];
        renderFlashWord(el, word, intensity);

        const delay = convertSpeed(speed, elapsed, totalDurationMs);

        index = (index + 1) % words.length;
        setTimeout(() => requestAnimationFrame(loop), delay);
    }

    requestAnimationFrame(loop);
}

function convertSpeed(speedTag, elapsed, total) {
    const progress = elapsed / total;

    // Base timings (in ms)
    let baseSlow = 120;
    let baseMedium = 80;
    let baseFast = 40;

    let base;
    switch (speedTag) {
        case "slow":
            base = baseSlow;
            break;
        case "fast":
            base = baseFast;
            break;
        default:
            base = baseMedium;
            break;
    }

    // Ramp: start slow → peak fast → slow down
    if (progress < 0.3) {
        // ramp up
        return base * 1.4;
    } else if (progress < 0.7) {
        // peak speed
        return base * 0.7;
    } else {
        // ramp down
        return base * 1.6;
    }
}

function renderFlashWord(el, word, intensity) {
    // Basic intensity mapping
    switch (intensity) {
        case "sharp":
            el.style.opacity = "1";
            el.style.filter = "none";
            el.style.fontWeight = "700";
            break;
        case "strong":
            el.style.opacity = "0.9";
            el.style.filter = "none";
            el.style.fontWeight = "600";
            break;
        case "deep":
            el.style.opacity = "0.8";
            el.style.filter = "blur(1px)";
            el.style.fontWeight = "500";
            break;
        case "soft":
        default:
            el.style.opacity = "0.7";
            el.style.filter = "none";
            el.style.fontWeight = "400";
            break;
    }

    el.textContent = word;
}

function clearFlash(el) {
    el.textContent = "";
    el.style.opacity = "0";
    el.style.filter = "none";
    el.style.fontWeight = "400";
}

// Convenience launcher for your commands
// durationSeconds: 7, 10, 12, 15, etc.
async function startFlash(category, lessonName, durationSeconds, outputElementId = "flash-output", onEnd = null) {
    const words = await loadFlashLesson(category, lessonName);
    if (!words) return;
    playFlashLesson(words, durationSeconds * 1000, outputElementId, onEnd);
}

// Example wiring (you can hook this into your command system):
// startFlash("computers", "lesson1-free", 7);
// startFlash("computers", "lesson2-paid", 10);
// startFlash("computers", "lesson3-free", 12);
// startFlash("computers", "lesson4-paid", 15);

export {
    loadFlashLesson,
    playFlashLesson,
    startFlash
};
