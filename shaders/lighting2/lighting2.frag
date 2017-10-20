// FS
#version 330 core
in vec4 frontColor;
out vec4 fragColor;

uniform mat3 normalMatrix;

void main() {
	fragColor = frontColor;
}


