uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() 
{
    float multTime = uTime * float(10);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(position.x * uFrequency.x - multTime)*0.1;
    elevation += sin(position.y * uFrequency.y - multTime)*0.02;

    modelPosition.z += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vElevation = elevation;
}