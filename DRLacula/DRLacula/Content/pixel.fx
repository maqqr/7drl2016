
//float PixSize;

float2 Resolution;
float Time;

float Misalign; // 0.001

//float offset[] = { 0.0, 1.0, 2.0, 3.0, 4.0 };
//float weight[] = { 0.2270270270, 0.1945945946, 0.1216216216, 0.0540540541, 0.0162162162 };

sampler TextureSampler: register(s0);

// [-1, +1] -> [0, +1]
float2 distort(float2 p) {
	float theta = atan2(p.y, p.x);
	float radius = length(p);
	//radius = pow(radius, 1.05);
	radius = pow(radius, 1.0 + 0.04 + Misalign * 3.0);
	p.x = radius * cos(theta);
	p.y = radius * sin(theta);
	return 0.5 * (p + 1.0);
}

float4 PixShader(float2 texCoord: TEXCOORD0) : COLOR0
{
	float2 uv = distort((texCoord.xy - 0.5) * 2.0);
	float3 original_color = tex2D(TextureSampler, uv).rgb;

	// Color misalignment
	float3 color;
	color.r = tex2D(TextureSampler, float2(uv.x + Misalign, uv.y + Misalign * 0.5)).x;
	color.g = tex2D(TextureSampler, float2(uv.x + Misalign * 0.4, uv.y - Misalign * 0.3)).y;
	color.b = tex2D(TextureSampler, float2(uv.x - Misalign, uv.y + Misalign * 0.1)).z;

	// Vignette
	color *= 0.6 + 0.4 * 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);

	// Scanlines
	color *= 0.8 + 0.2 * sin(12.3 * Time + uv.y * Resolution.y);

	// Glow
	float radius = 3.1;
	float3 glow = float3(0, 0, 0);
	for (int x = -5; x<5; x++) {
		for (int y = -5; y<5; y++) {
			float w = 0.0;
			if (!(x == 0 && y == 0))
				w = 0.1 * 1.0 / sqrt(float(x*x + y*y));
			glow += w * tex2D(TextureSampler, uv + float2(radius * x / Resolution.x,
				radius * y / Resolution.y)).rgb;
		}
	}
	glow *= 1.0 / 10.0 * 10.0;
	color += 0.4 * glow;

	return float4(color, 1);
}

/*
float4 PixShader(float2 texCoord: TEXCOORD0) : COLOR0
{
    float dx = PixSize; // * (1. / 512.);
    float dy = PixSize; // * (1. / 512.);

    float dtx = floor(texCoord.x / dx);
    float dty = floor(texCoord.y / dy);

    float2 blockCoord = float2(dx * dtx,
                               dy * dty);

	//return float4(1,0,0,1);
	return tex2D(TextureSampler, blockCoord);
}
*/

technique hit
{
    pass Pass1
    {
		//PixelShader = compile ps_2_0 PixShader();
		PixelShader = compile ps_3_0 PixShader();
    }
}
