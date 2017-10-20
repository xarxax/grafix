// VS
#version 330 core

layout (location = 0)in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrixInverse;

uniform float n=4;
uniform vec4 lightPosition;

void main() {
    vec3 object_light = (modelViewMatrixInverse*lightPosition).xyz;
    float d = distance(vertex, object_light);
    float w = clamp(1/pow(d, n), 0, 1);
    vec3 new_vertex = mix(vertex, object_light, w);

    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(new_vertex, 1.0);
}

