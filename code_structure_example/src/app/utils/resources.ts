import {
  CubeTexture,
  CubeTextureLoader,
  EventDispatcher,
  TextureLoader,
} from "three";
import { EventType } from "../types/event-type";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import resources from "./resources_files";
import { ResourceType, ImportedResource } from "../types/asset-type";

interface Loaders {
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;
  cubeTextureLoader: CubeTextureLoader;
}

export default class Resources extends EventDispatcher<EventType> {
  loaders: Loaders;
  resourcesToLoad: ImportedResource[];

  numberOfTotalResources: number;
  numberOfloadedResources: number;
  loadedResources: {};

  constructor() {
    super();

    this.loadedResources = {};

    this.resourcesToLoad = [...resources];
    this.numberOfTotalResources = this.resourcesToLoad.length;
    this.numberOfloadedResources = 0;

    this.setLoaders();
    this.loadResources();
  }

  private loadResources() {
    this.resourcesToLoad.forEach((resource) => {
      switch (resource.type) {
        case ResourceType.GLTF:
          this.loadGLTF(resource);
          break;
        case ResourceType.Texture:
          this.loadTexture(resource);
          break;
        case ResourceType.CubeTexture:
          this.loadCubeTexture(resource);
          break;
        default:
          break;
      }
    });
  }

  private loadCubeTexture(resource: ImportedResource): CubeTexture {
    return this.loaders.cubeTextureLoader.load(resource.path, (cubeTexture) => {
      this.resourceLoaded(resource.name, cubeTexture);
    });
  }

  private loadTexture(resource: ImportedResource) {
    this.loaders.textureLoader.load(resource.path[0], (texture) => {
      this.resourceLoaded(resource.name, texture);
    });
  }

  private loadGLTF(resource: ImportedResource) {
    this.loaders.gltfLoader.load(resource.path[0], (gltf) => {
      this.resourceLoaded(resource.name, gltf);
    });
  }

  private resourceLoaded(source, file) {
    this.loadedResources[source] = file;

    this.numberOfloadedResources++;

    if (this.numberOfloadedResources === this.numberOfTotalResources) {
      this.dispatchEvent({
        type: "resourcesLoaded",
      });
    }
  }

  private setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader(),
    };
  }
}
