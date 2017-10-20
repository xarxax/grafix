// FS
#version 330 core
in vec4 frontColor;
in vec3 minormal;
out vec4 fragColor;

uniform mat3 normalMatrix;

void main() {
	vec3 N = normalize( minormal);
	fragColor = frontColor * N.z;
}


