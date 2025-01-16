import { ImportedResource, ResourceType } from "../types/asset-type";

const resources: ImportedResource[] = [
  {
    name: "environmentMapTexture",
    type: ResourceType.CubeTexture,
    path: [
      "/textures/environmentMap/px.jpg",
      "/textures/environmentMap/nx.jpg",
      "/textures/environmentMap/py.jpg",
      "/textures/environmentMap/ny.jpg",
      "/textures/environmentMap/pz.jpg",
      "/textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "floorColorTexture",
    type: ResourceType.Texture,
    path: ["/textures/dirt/color.jpg"],
  },
  {
    name: "floorNormalTexture",
    type: ResourceType.Texture,
    path: ["/textures/dirt/normal.jpg"],
  },
  {
    name: "foxModel",
    type: ResourceType.GLTF,
    path: ["/models/Fox/glTF/Fox.gltf"],
  },
];

export default resources;
