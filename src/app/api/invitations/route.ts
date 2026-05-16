import {
  InvitationImageValidationError,
  normalizeInvitationImage,
  uploadInvitationImage,
} from "@/lib/invitationImages";
import {
  createInvitation,
  InvitationValidationError,
  normalizeCreateInvitationInput,
} from "@/lib/invitations";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function parseInvitationRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    const payload = await request.json();
    return {
      input: normalizeCreateInvitationInput(payload),
      imageFile: null,
    };
  }

  const formData = await request.formData();
  const input = normalizeCreateInvitationInput({
    title: formData.get("title"),
    groom_name: formData.get("groom_name"),
    bride_name: formData.get("bride_name"),
    wedding_date: formData.get("wedding_date"),
    venue: formData.get("venue"),
    message: formData.get("message"),
  });

  return {
    input,
    imageFile: normalizeInvitationImage(formData.get("image")),
  };
}

export async function POST(request: Request) {
  try {
    const { input, imageFile } = await parseInvitationRequest(request);
    const imageUrl = imageFile ? await uploadInvitationImage(imageFile) : null;
    const invitation = await createInvitation({
      ...input,
      image_url: imageUrl,
    });

    return NextResponse.json(
      {
        invitation,
        publicUrl: `/i/${invitation.public_id}`,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof InvitationValidationError ||
      error instanceof InvitationImageValidationError
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const message =
      error instanceof Error
        ? error.message
        : "초대장을 저장하는 중 오류가 발생했습니다.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
