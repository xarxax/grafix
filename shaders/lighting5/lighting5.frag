// FS
#version 330 core
in vec4 frontColor;
in vec3 norm;
in vec3 pos;
out vec4 fragColor;


uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelViewProjectionMatrix;
uniform mat4 viewMatrixInverse;

uniform vec4 matAmbient, matDiffuse, matSpecular;
uniform float matShininess;
uniform vec4 lightAmbient, lightDiffuse, lightSpecular, lightPosition;
uniform bool world;

vec4 light(vec3 N, vec3 V, vec3 L)
{
	N=normalize(N);
	V=normalize(V);
	L=normalize(L);
	vec3 R = normalize( 2.0*dot(N,L)*N-L );
	float NdotL = max( 0.0, dot( N,L ) );
	float RdotV = max( 0.0, dot( R,V ) );
	float Idiff = NdotL;
	float Ispec = 0;
	if (NdotL>0) Ispec=pow( RdotV, matShininess );
	return
	 matAmbient * lightAmbient +
	matDiffuse * lightDiffuse * Idiff +
	matSpecular * lightSpecular * Ispec;
}


void main() {
	vec3 P,N,V,L;
	if(world){
		P=pos;
		N=normalize(norm);
		V= (viewMatrixInverse*vec4(0,0,0,1)).xyz-P;
		L = (viewMatrixInverse*lightPosition).xyz-P;
			
	}else {
		N = normalize(normalMatrix * norm);
		P = (modelViewMatrix * vec4(pos,1.0)).xyz;
		V = -P;
		L = lightPosition.xyz - P;
	}
	fragColor = light(N, V,L);
}


