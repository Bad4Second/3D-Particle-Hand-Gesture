const isMobile = window.innerWidth <= 768;
const scaleFactor = isMobile ? 0.45 : 1.0; 

const NUM_PARTICLES = 1500;
const NUM_SPHERE = 700;

let currentMode = 1;
let targetMode = 1;
let rotationAngle = 0;

let handPos = { x: 0, y: 0, z: -12 };
let targetHandPos = { x: 0, y: 0, z: -12 };

let gestureHistory = [];
const BUFFER_SIZE = 6;

const modeLabels = {
    1: "KOSMOS (Default)",
    2: "SATURNUS 3D (👆)",
    3: "I LOVE YOU (✌)",
    4: "HATI / LOVE (✊)",
    5: "BUKET BUNGA (🖐)"
};

const positions = { 
    1: new Float32Array(NUM_PARTICLES * 3), 
    2: new Float32Array(NUM_PARTICLES * 3), 
    3: new Float32Array(NUM_PARTICLES * 3), 
    4: new Float32Array(NUM_PARTICLES * 3), 
    5: new Float32Array(NUM_PARTICLES * 3) 
};
const currentPositions = new Float32Array(NUM_PARTICLES * 3);
const particleColors = new Float32Array(NUM_PARTICLES * 3);

const spreadLimit = isMobile ? 3.0 : 4.5;
for(let i=0; i < NUM_PARTICLES * 3; i++) { positions[1][i] = (Math.random() - 0.5) * (spreadLimit * 2); }

for(let i=0; i < NUM_PARTICLES; i++) {
    let i3 = i * 3;
    if (i < NUM_SPHERE) {
        let phi = Math.random() * Math.PI * 2;
        let costheta = (Math.random() * 2) - 1;
        let theta = Math.acos(costheta);
        let r = 1.3 * scaleFactor;
        positions[2][i3]   = r * Math.sin(theta) * Math.cos(phi);
        positions[2][i3+1] = r * Math.sin(theta) * Math.sin(phi);
        positions[2][i3+2] = r * Math.cos(theta);
    } else {
        let theta = Math.random() * Math.PI * 2;
        let r = (1.8 + Math.random() * 2.2) * scaleFactor;
        positions[2][i3]   = r * Math.cos(theta);
        positions[2][i3+1] = (Math.random() - 0.5) * 0.08;
        positions[2][i3+2] = r * Math.sin(theta);
    }
}

const textCanvas = document.createElement('canvas');
const tCtx = textCanvas.getContext('2d');
textCanvas.width = 600; textCanvas.height = 150;
tCtx.fillStyle = '#000'; tCtx.fillRect(0, 0, 600, 150);
tCtx.fillStyle = '#fff'; tCtx.font = isMobile ? 'bold 48px sans-serif' : 'bold 68px sans-serif'; 
tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
tCtx.fillText('I LOVE YOU', 300, 75);

const imgData = tCtx.getImageData(0, 0, 600, 150).data;
const textPoints = [];
for (let y = 0; y < 150; y += 2) {
    for (let x = 0; x < 600; x += 2) {
        let idx = (y * 600 + x) * 4;
        if (imgData[idx] > 120) {
            let divisor = isMobile ? 52.0 : 58.0; 
            textPoints.push({ x: (x - 300) / divisor, y: -(y - 75) / divisor, z: (Math.random() - 0.5) * 0.15 });
        }
    }
}
for(let i=0; i < NUM_PARTICLES; i++) {
    let pt = textPoints[Math.floor(Math.random() * textPoints.length)] || {x:0, y:0, z:0};
    let i3 = i * 3;
    positions[3][i3]   = pt.x; positions[3][i3+1] = pt.y; positions[3][i3+2] = pt.z;
}

for(let i=0; i < NUM_PARTICLES; i++) {
    let i3 = i * 3;
    let t = (Math.random() * Math.PI * 2) - Math.PI;
    let p = (Math.random() * Math.PI * 2) - Math.PI;
    let x = 2.0 * Math.pow(Math.sin(t), 3);
    let y = 2.0 * Math.cos(t) - 0.7 * Math.cos(2*t) - 0.3 * Math.cos(3*t) - 0.1 * Math.cos(4*t);
    let z = Math.sin(p) * 0.4;
    positions[4][i3]   = x * 0.85 * scaleFactor; positions[4][i3+1] = ((y * 0.85) + 0.5) * scaleFactor; positions[4][i3+2] = z * scaleFactor;
}

for(let i=0; i < NUM_PARTICLES; i++) {
    let i3 = i * 3;
    positions[5][i3] = 0; positions[5][i3+1] = 0; positions[5][i3+2] = 0;
}

for(let i=0; i<NUM_PARTICLES*3; i++) { currentPositions[i] = positions[1][i]; }

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(isMobile ? 55 : 45, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 0; 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const pTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png');
const material = new THREE.PointsMaterial({
    size: isMobile ? 0.15 : 0.18, vertexColors: true, transparent: true, opacity: 0.85, map: pTexture, alphaTest: 0.02, blending: THREE.AdditiveBlending, depthWrite: false
});
const particleSystem = new THREE.Points(geometry, material);
scene.add(particleSystem);

function updateParticleColors(mode) {
    const colorsAttr = geometry.attributes.color;
    for(let i=0; i<NUM_PARTICLES; i++) {
        let i3 = i * 3;
        if(mode === 3) { particleColors[i3] = 0.0; particleColors[i3+1] = 0.8; particleColors[i3+2] = 1.0; } 
        else if(mode === 4) { particleColors[i3] = 1.0; particleColors[i3+1] = 0.1; particleColors[i3+2] = 0.4; } 
        else if(mode === 2) {
            if(i >= NUM_SPHERE) { particleColors[i3] = 1.0; particleColors[i3+1] = 0.7; particleColors[i3+2] = 0.3; } 
            else { particleColors[i3] = 1.0; particleColors[i3+1] = 0.5; particleColors[i3+2] = 0.0; }
        } else { particleColors[i3] = 0.1; particleColors[i3+1] = 0.4; particleColors[i3+2] = 0.85; }
    }
    colorsAttr.needsUpdate = true;
}
updateParticleColors(1);

const videoElement = document.getElementById('webcam');
const handCanvas = document.getElementById('hand-canvas');
const ctxOverlay = handCanvas.getContext('2d');
const modeLabel = document.getElementById('mode-label');
const loadingText = document.getElementById('loading-text');
const cssBouquet = document.getElementById('css-bouquet');

function hitungModeGestur(landmarks) {
    const tips = [8, 12, 16, 20];
    const pips = [6, 10, 14, 18];
    let jariBerdiri = 0;
    for(let i=0; i<4; i++) { if(landmarks[tips[i]].y < landmarks[pips[i]].y) jariBerdiri++; }
    
    const indexUp = landmarks[8].y < landmarks[6].y;
    const middleUp = landmarks[12].y < landmarks[10].y;
    const ringUp = landmarks[16].y < landmarks[14].y;
    const pinkyUp = landmarks[20].y < landmarks[18].y;

    if (jariBerdiri === 4) return 5; 
    if (jariBerdiri === 0) return 4; 
    if (indexUp && !middleUp && !ringUp && !pinkyUp) return 2; 
    if (indexUp && middleUp && !ringUp && !pinkyUp) return 3; 
    return 1; 
}

const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
hands.setOptions({ maxNumHands: 1, modelComplexity: isMobile ? 0 : 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.7 });

function hilangkanLoading() {
    const loader = document.getElementById('loading');
    if(loader) { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 400); }
}

hands.onResults((results) => {
    hilangkanLoading();
    ctxOverlay.clearRect(0, 0, handCanvas.width, handCanvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        let rawMode = hitungModeGestur(landmarks);

        gestureHistory.push(rawMode);
        if (gestureHistory.length > BUFFER_SIZE) gestureHistory.shift();

        let counts = {}; let dominantMode = rawMode; let maxCount = 0;
        for (let i = 0; i < gestureHistory.length; i++) {
            let num = gestureHistory[i]; counts[num] = (counts[num] || 0) + 1;
            if (counts[num] > maxCount) { maxCount = counts[num]; dominantMode = num; }
        }
        targetMode = dominantMode;

        drawConnectors(ctxOverlay, landmarks, HAND_CONNECTIONS, {color: '#00e5ff', lineWidth: 3});
        drawLandmarks(ctxOverlay, landmarks, {color: '#ffffff', lineWidth: 1, radius: 2.5});

        const wrist = landmarks[0];
        
        const boundsX = isMobile ? 7.0 : 12.0;
        const boundsY = isMobile ? 5.0 : 8.0;
        targetHandPos.x = (wrist.x - 0.5) * boundsX;
        targetHandPos.y = -(wrist.y - 0.5) * boundsY;

        const pinkyMcp = landmarks[17];
        const distance = Math.sqrt(Math.pow(wrist.x - pinkyMcp.x, 2) + Math.pow(wrist.y - pinkyMcp.y, 2));
        const baseDepth = isMobile ? -9.0 : -11.0;
        targetHandPos.z = baseDepth - (1.0 / (distance + 0.01)) * 0.15;
        
        if (targetMode === 5) {
            cssBouquet.classList.add('active');
        } else {
            cssBouquet.classList.remove('active');
        }

    } else {
        gestureHistory = [];
        targetMode = 1;
        targetHandPos.x = 0; targetHandPos.y = 0; targetHandPos.z = isMobile ? -10 : -12;
        cssBouquet.classList.remove('active');
    }

    if(currentMode !== targetMode) {
        currentMode = targetMode;
        modeLabel.innerText = `${modeLabels[currentMode]}`;
        updateParticleColors(currentMode);
    }
});

async function initCamera() {
    try {
        loadingText.innerText = "Meminta Akses Kamera Device...";
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: isMobile ? 320 : 240, height: isMobile ? 240 : 360, facingMode: "user" }, audio: false
        });
        videoElement.srcObject = stream;
        loadingText.innerText = "Menghubungkan Mediapipe ke Kamera...";
        
        const cameraUtils = new Camera(videoElement, {
            onFrame: async () => {
                if (handCanvas.width !== videoElement.videoWidth) {
                    handCanvas.width = videoElement.videoWidth;
                    handCanvas.height = videoElement.videoHeight;
                }
                await hands.send({ image: videoElement });
            }
        });
        await cameraUtils.start();
        modeLabel.innerText = modeLabels[1];
        setTimeout(hilangkanLoading, 2000);
    } catch (err) {
        console.error(err);
        loadingText.innerHTML = `<span style="color:#ff3b30;font-weight:bold;">Gagal Akses Kamera!</span><br><br>Gunakan koneksi HTTPS atau berikan izin kamera pada browser Anda.`;
    }
}

window.addEventListener('DOMContentLoaded', () => { initCamera(); });

function animate() {
    requestAnimationFrame(animate);

    handPos.x += (targetHandPos.x - handPos.x) * 0.12;
    handPos.y += (targetHandPos.y - handPos.y) * 0.12;
    handPos.z += (targetHandPos.z - handPos.z) * 0.12;

    if (currentMode === 5) {
        material.opacity += (0.0 - material.opacity) * 0.2; 
    } else {
        material.opacity += (0.85 - material.opacity) * 0.1; 
    }

    if (currentMode === 1) rotationAngle += 0.005;
    else if (currentMode === 2) rotationAngle += 0.025;
    else if (currentMode === 3) rotationAngle = 0; 
    else if (currentMode === 4) rotationAngle += 0.015;
    else if (currentMode === 5) rotationAngle += 0.006;

    particleSystem.rotation.y = rotationAngle;

    if (currentMode !== 1) {
        particleSystem.position.set(handPos.x, handPos.y, handPos.z);
        particleSystem.rotation.x = (currentMode === 2) ? 0.35 : 0;
    } else {
        particleSystem.position.set(0, 0, isMobile ? -10 : -12);
        particleSystem.rotation.x = 0;
    }

    const posAttr = geometry.attributes.position;
    const targetPositionsArray = positions[currentMode];

    for (let i = 0; i < NUM_PARTICLES * 3; i++) {
        currentPositions[i] += (targetPositionsArray[i] - currentPositions[i]) * 0.12;
    }
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
