import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      // Activate shadow here
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1;
gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);

// HDR (RGBE) equirectangular
rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Models
 */
// Helmet
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});

//textures
const wallColor = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg"
);
wallColor.colorSpace = THREE.SRGBColorSpace;

const wallArm = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg"
);
const wallNormal = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png"
);

const floorColor = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg"
);
floorColor.colorSpace = THREE.SRGBColorSpace;
const floorArm = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg"
);
const floorNormal = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png"
);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: floorColor,
    normalMap: floorNormal,
    aoMap: floorArm,
    roughnessMap: floorArm,
    metalnessMap: floorArm,
  })
);
floor.position.set(0, 0, 0);
floor.rotateX(-(1 / 2) * Math.PI);
scene.add(floor);

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: wallColor,
    normalMap: wallNormal,
  })
);
wall.position.set(0, 9, -10);
scene.add(wall);

//Lights
const directionalLight = new THREE.DirectionalLight("white", 6);
directionalLight.position.set(-5, 6, 3);
directionalLight.castShadow = true;
directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();
directionalLight.shadow.camera.far = 25;
directionalLight.shadow.mapSize.set(256, 256);
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(10);
gui
  .add(directionalLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("light x");
gui
  .add(directionalLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("light y");
gui
  .add(directionalLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("light z");

// const dch = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dch);

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;

gui.add(renderer, "toneMapping", {
  None: THREE.NoToneMapping,
  Neutral: THREE.NeutralToneMapping,
  Cineon: THREE.CineonToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Filmic: THREE.ACESFilmicToneMapping,
});

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
