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

//Texture loader
const textureLoader = new THREE.TextureLoader();

//Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");

const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

const floorArmTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);
floorArmTexture.repeat.set(8, 8);
floorArmTexture.wrapS = THREE.RepeatWrapping;
floorArmTexture.wrapT = THREE.RepeatWrapping;

const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);
floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);
floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const floorSize = 20;
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorSize, floorSize, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorArmTexture,
    roughnessMap: floorArmTexture,
    metalnessMap: floorArmTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.1,
  })
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

const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallArmTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg"
);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMeasurements.wallWidth,
    houseMeasurements.wallHeight,
    houseMeasurements.wallDepth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallArmTexture,
    roughnessMap: wallArmTexture,
    metalnessMap: wallArmTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = houseMeasurements.wallHeight / 2;

//roof
const roofColorTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofArmTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg"
);

roofColorTexture.repeat.set(3, 1);
roofArmTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofArmTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, houseMeasurements.roofHeight, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofArmTexture,
    roughnessMap: roofArmTexture,
    metalnessMap: roofArmTexture,
    normalMap: roofNormalTexture,
  })
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

for (let i = 0; i < 5; i++) {
  const bush = new THREE.Mesh(bushGeometry, bushTexture);

  const minRadius =
    Math.max(houseMeasurements.wallWidth, houseMeasurements.wallDepth) / 2 +
    1.5;
  const maxRadius = floorSize / 2 - 4;

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

//graves
const graves = new THREE.Group();
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveTexture = new THREE.MeshStandardMaterial();

for (let i = 0; i <= 15; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveTexture);

  const minRadius =
    Math.max(houseMeasurements.wallWidth, houseMeasurements.wallDepth) / 2 +
    1.5;
  const maxRadius = floorSize / 2 - 3;

  //0 to 360
  const angle = Math.random() * 2 * Math.PI;
  //using πr²
  const radius = Math.sqrt(
    Math.random() * (maxRadius * maxRadius - minRadius * minRadius) +
      minRadius * minRadius
  );

  grave.position.x = radius * Math.cos(angle);
  grave.position.z = radius * Math.sin(angle);
  grave.position.y = 0.3 + Math.random() * 0.1;

  grave.rotation.x = (Math.random() - 0.5) * 0.2;
  grave.rotation.y = (Math.random() - 0.5) * 0.2;
  grave.rotation.z = (Math.random() - 0.5) * 0.2;

  graves.add(grave);
}

decorGroup.add(graves);
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
