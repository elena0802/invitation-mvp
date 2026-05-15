import {
  createInvitation,
  InvitationValidationError,
  normalizeCreateInvitationInput,
} from "@/lib/invitations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const input = normalizeCreateInvitationInput(payload);
    const invitation = await createInvitation(input);

    return NextResponse.json(
      {
        invitation,
        publicUrl: `/i/${invitation.public_id}`,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof InvitationValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const message =
      error instanceof Error
        ? error.message
        : "초대장을 저장하는 중 오류가 발생했습니다.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
