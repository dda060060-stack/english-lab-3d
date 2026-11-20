import * as THREE from 'three';

let scene, camera, renderer, raycaster, mouse;
let interactiveObjects = [];
let lessons = [];
let currentTarget = null;
let mode = 'EXPLORE'; // 'EXPLORE' or 'QUIZ'

const uiOverlay = document.getElementById('ui-overlay');
const quizOverlay = document.getElementById('quiz-overlay');
const lessonTitle = document.getElementById('lesson-title');
const pronounceBtn = document.getElementById('pronounce-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const targetLessonText = document.getElementById('target-lesson');
const quizFeedback = document.getElementById('quiz-feedback');
const exitQuizBtn = document.getElementById('exit-quiz-btn');

async function init() {
    // Fetch lessons
    const response = await fetch('lessons.json');
    const data = await response.json();
    lessons = data.keywords;

    // Three.js Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 2;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create Room Primitives
    createObjects();

    // Interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onWindowResize);

    pronounceBtn.addEventListener('click', () => speak(lessonTitle.innerText));
    startQuizBtn.addEventListener('click', enterQuizMode);
    exitQuizBtn.addEventListener('click', exitQuizMode);

    animate();
}

function createObjects() {
    const geometries = [
        new THREE.BoxGeometry(1.5, 2, 0.3), // Book
        new THREE.SphereGeometry(1, 32, 32), // Globe
        new THREE.CapsuleGeometry(0.3, 1, 4, 8), // Pencil Case (as capsule)
        new THREE.CylinderGeometry(1, 1, 0.2, 32), // Clock
        new THREE.ConeGeometry(0.8, 1.5, 4), // Mini House (roof)
        new THREE.TorusGeometry(0.5, 0.2, 16, 100), // Clothing accessory
        new THREE.BoxGeometry(2, 1.2, 0.1) // Computer Screen
    ];

    const positions = [
        [-3, 0, 0], [3, 0, 0], [-1.5, 2, -2], [1.5, 2, -2],
        [0, 0, -3], [-4, 3, -1], [4, 3, -1]
    ];

    geometries.forEach((geo, i) => {
        if (i >= lessons.length) return;

        const material = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color().setHSL(i / 7, 0.7, 0.5) 
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(...positions[i]);
        mesh.userData = { lesson: lessons[i], id: i };
        
        scene.add(mesh);
        interactiveObjects.push(mesh);
    });
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        handleObjectSelection(clicked);
    }
}

function handleObjectSelection(object) {
    const lesson = object.userData.lesson;

    if (mode === 'EXPLORE') {
        lessonTitle.innerText = lesson;
        pronounceBtn.classList.remove('hidden');
        speak(lesson);
        
        // Highlight effect
        interactiveObjects.forEach(obj => obj.material.emissive.setHex(0x000000));
        object.material.emissive.setHex(0x333333);
    } else if (mode === 'QUIZ') {
        if (lesson === currentTarget) {
            quizFeedback.innerText = "Correct! Well done.";
            quizFeedback.style.color = "#4CAF50";
            speak("Correct!");
            setTimeout(nextQuizQuestion, 1500);
        } else {
            quizFeedback.innerText = "Try again!";
            quizFeedback.style.color = "#f44336";
            speak("Try again");
        }
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

function enterQuizMode() {
    mode = 'QUIZ';
    uiOverlay.classList.add('hidden');
    quizOverlay.classList.remove('hidden');
    nextQuizQuestion();
}

function exitQuizMode() {
    mode = 'EXPLORE';
    quizOverlay.classList.add('hidden');
    uiOverlay.classList.remove('hidden');
    lessonTitle.innerText = "Select an object to study";
    pronounceBtn.classList.add('hidden');
    interactiveObjects.forEach(obj => obj.material.emissive.setHex(0x000000));
}

function nextQuizQuestion() {
    const randomIndex = Math.floor(Math.random() * interactiveObjects.length);
    currentTarget = interactiveObjects[randomIndex].userData.lesson;
    targetLessonText.innerText = currentTarget;
    quizFeedback.innerText = "";
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Subtle animation
    interactiveObjects.forEach((obj, i) => {
        obj.rotation.y += 0.005;
        obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
    });

    renderer.render(scene, camera);
}

init();
