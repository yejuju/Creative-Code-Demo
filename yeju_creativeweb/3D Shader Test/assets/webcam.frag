// A Radiant Shader Vision for Bright Pastel Worlds
// by Yeju's Creative Flow

precision mediump float;

// Texture coordinates from the vertex shader
varying vec2 vTexCoord;

// The webcam feed as a texture
uniform sampler2D tex0;

// Time uniform to add dynamic changes
uniform float time;

void main() {
    vec2 uv = vTexCoord;

    // Correct the vertical orientation of the texture
    uv.y = 1.0 - uv.y;

    // Sample the webcam texture
    vec4 tex = texture2D(tex0, uv);
    
    // Introduce a time-based oscillation for dynamic visuals
    float dynamicFactor = sin(time * 0.5) * 0.5 + 0.5;

    // Calculate grayscale intensity, a foundation for the brightness
    float gray = (tex.r + tex.g + tex.b) / 3.0;

    // Adjust resolution and scaling, fine-tuned for brightness and dynamic shifts
    float resolution = 25.0 + 15.0 * sin(time * 0.2);
    float scale = resolution / (8.0 + dynamicFactor * 16.0);
    
    // Thresholds to create bright, high-saturated effects
    float threshR = (fract(floor(tex.r * resolution) / scale) * scale) * gray;
    float threshG = (fract(floor(tex.g * resolution) / scale) * scale) * gray;
    float threshB = (fract(floor(tex.b * resolution) / scale) * scale) * gray;

    // Amplify the thresholds for brighter, pastel-like tones
    vec3 pastelBoost = vec3(threshR * 1.8, threshG * 1.8, threshB * 1.8);

    // Create a pastel palette by introducing subtle shifts in the color space
    vec3 pastelColors = vec3(pastelBoost.r + 0.3, pastelBoost.g + 0.3, pastelBoost.b + 0.6);

    // Saturate the colors, ensuring they remain vibrant and pop visually
    vec3 highSaturation = pastelColors * vec3(1.3, 1.2, 1.4);

    // Apply brightness enhancement for a glowing, radiant look
    vec3 finalColor = highSaturation * 1.2;

    // Render the output with brighter, pastel, and highly saturated colors
    gl_FragColor = vec4(finalColor, 1.0);
}
