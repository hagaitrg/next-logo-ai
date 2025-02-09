import { generateLogo } from "@/services/generate-logo";
import { FormLogoValues } from "@/global.types";
import { auth } from "@clerk/nextjs/server";
import { storeLogo } from "@/services/store-logo";

export async function POST(request: Request) {
  const payload: FormLogoValues = await request.json();
  const { userId } = await auth();
  try {
    const result = await generateLogo(payload);
    await storeLogo({
      userID: userId!,
      name: payload.name,
      description: payload.description,
      image: result,
    });
    return Response.json({ data: result });
  } catch (err) {
    console.error("Failed Generate Logo:", err);
    return new Response(null, { status: 500 });
  }
}
