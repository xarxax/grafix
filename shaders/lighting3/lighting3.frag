// FS
#version 330 core
in vec4 frontColor;
out vec4 fragColor;
in vec3 minormal;
in vec3 pos; 

uniform mat3 normalMatrix;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform vec4 matAmbient, matDiffuse, matSpecular;
uniform float matShininess;
uniform vec4 lightAmbient, lightDiffuse, lightSpecular, lightPosition;

vec4 light(vec3 N, vec3 V, vec3 L)
{
	N=normalize(N);
	V = new vec3(0.0,0.0,1);
	L=normalize(L);
	vec3 H = normalize(V+L);
	float Idiff = max( 0.0, dot( N,L ) );
	float Ispec = max(0.0, dot(N,H));
	if (Ispec >0) Ispec=pow( Ispec, matShininess );
	return
	 matAmbient * lightAmbient +
	matDiffuse * lightDiffuse * Idiff +
	matSpecular * lightSpecular * Ispec;
}

void main() {
	vec3 N = normalize(minormal);
	vec3 P = pos;
	vec3 V = -P;
	vec3 L = lightPosition.xyz - P;
	fragColor = light(N, V, L);
}


