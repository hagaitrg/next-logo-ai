import { FormLogoValues } from "@/global.types"
import { serverConfig } from "@/lib/config.server";

const generatePrompt = (values: FormLogoValues): string => {
    const prompts = [
        "You are a logo designer. Your task is to create a logo with these spesifications:",
        `logo_name=${values.name}`,
        `logo_description=${values.description}`,
        `logo_style=${values.style}`
    ];

    if (values.colors.length !== 0) {
        prompts.push(`colors=${values.colors}`)
    }

    return prompts.join(" ");
}

const convertToBaset64Image = (base64ImageData: string) => {
    return `data:image/png;base64,${base64ImageData}`
}

const generateLogoWithTogether = async (prompt: string) => {
    const payload = {
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt: prompt,
        width: 1400,
        height: 1440,
        steps: 4,
        n: 1,
        response_format: "b64_json",
    }
    const response = await fetch("https://api.together.xyz/v1/images/generations", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${serverConfig.togetherApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed Generate with Together");
    }

    const jsonResponse: { data: { base64_json: string }[] } = await response.json();
    return convertToBaset64Image(jsonResponse.data[0].base64_json)
}

const generateLogoWIthHF = async (prompt: string) => {
    const payload = {
        inputs: prompt,
        parameters: {
            num_inference_steps: 4,
        }
    }
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
            headers: {
                Authorization: `Bearer ${serverConfig.hfToken}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        throw new Error("Failed Generate Logo with HF")
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    return convertToBaset64Image(base64Data);
}

export const generateLogo = async (values: FormLogoValues): Promise<string> => {
    const prompt = generatePrompt(values);
    try {
        return await generateLogoWithTogether(prompt);
    } catch (err) {
        console.error("Togerther Failed:", err);
        return await generateLogoWIthHF(prompt);
    }
}