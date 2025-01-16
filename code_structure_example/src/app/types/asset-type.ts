export interface ImportedResource {
  name: string;
  type: ResourceType;
  path: string[];
}

export enum ResourceType {
  CubeTexture,
  Texture,
  GLTF,
}
