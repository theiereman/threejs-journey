import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Floor
const floorSize = 20;
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorSize, floorSize),
  new THREE.MeshStandardMaterial()
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
scene.add(floor);

const houseMeasurements = {
  wallWidth: 4,
  wallHeight: 2.5,
  wallDepth: 4,
  roofHeight: 1.5,
  doorTextureSize: 2.2,
};

/**
 * Decor
 */
const decorGroup = new THREE.Group();
//house
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMeasurements.wallWidth,
    houseMeasurements.wallHeight,
    houseMeasurements.wallDepth
  ),
  new THREE.MeshStandardMaterial()
);
walls.position.y = houseMeasurements.wallHeight / 2;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, houseMeasurements.roofHeight, 4),
  new THREE.MeshStandardMaterial()
);
roof.position.y =
  houseMeasurements.wallHeight + houseMeasurements.roofHeight / 2;
roof.rotation.y = Math.PI / 4;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(
    houseMeasurements.doorTextureSize,
    houseMeasurements.doorTextureSize
  ),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
door.position.z = houseMeasurements.wallDepth / 2 + 0.01;
door.position.y = houseMeasurements.doorTextureSize / 2;

//random bushes
const bushGeometry = new THREE.SphereGeometry(1);
const bushTexture = new THREE.MeshStandardMaterial();

for (let i = 0; i < 20; i++) {
  const bush = new THREE.Mesh(bushGeometry, bushTexture);

  const minRadius =
    Math.max(houseMeasurements.wallWidth, houseMeasurements.wallDepth) / 2 +
    1.5;
  const maxRadius = floorSize / 2 - 1.5;

  //0 to 360
  const angle = Math.random() * 2 * Math.PI;
  //using πr²
  const radius = Math.sqrt(
    Math.random() * (maxRadius * maxRadius - minRadius * minRadius) +
      minRadius * minRadius
  );

  bush.position.x = radius * Math.cos(angle);
  bush.position.z = radius * Math.sin(angle);

  const bushScale = 0.6 + Math.random() * 0.2;
  bush.scale.set(bushScale, bushScale, bushScale);

  decorGroup.add(bush);
}

decorGroup.add(walls, roof, door);
scene.add(decorGroup);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
