import { createPublicId } from "@/lib/publicId";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { CreateInvitationInput, InvitationRecord } from "@/types/invitation";

const REQUIRED_FIELDS: Array<keyof CreateInvitationInput> = [
  "title",
  "groom_name",
  "bride_name",
  "wedding_date",
  "venue",
  "message",
];

export class InvitationValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvitationValidationError";
  }
}

export function normalizeCreateInvitationInput(
  payload: unknown,
): CreateInvitationInput {
  if (!payload || typeof payload !== "object") {
    throw new InvitationValidationError("입력값이 올바르지 않습니다.");
  }

  const source = payload as Partial<Record<keyof CreateInvitationInput, unknown>>;

  const input = REQUIRED_FIELDS.reduce((result, field) => {
    const value = source[field];

    if (typeof value !== "string" || value.trim().length === 0) {
      throw new InvitationValidationError("모든 항목을 입력해주세요.");
    }

    return {
      ...result,
      [field]: value.trim(),
    };
  }, {} as CreateInvitationInput);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.wedding_date)) {
    throw new InvitationValidationError("예식일 형식이 올바르지 않습니다.");
  }

  return input;
}

export async function createInvitation(input: CreateInvitationInput) {
  const supabase = createSupabaseServerClient();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const publicId = createPublicId();

    const { data, error } = await supabase
      .from("invitations")
      .insert({
        public_id: publicId,
        title: input.title,
        groom_name: input.groom_name,
        bride_name: input.bride_name,
        wedding_date: input.wedding_date,
        venue: input.venue,
        message: input.message,
      })
      .select()
      .single<InvitationRecord>();

    if (!error && data) {
      return data;
    }

    if (error?.code !== "23505") {
      throw new Error(error?.message ?? "초대장을 저장하지 못했습니다.");
    }
  }

  throw new Error("공개 URL 생성에 실패했습니다. 다시 시도해주세요.");
}

export async function getInvitationByPublicId(publicId: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("invitations")
    .select()
    .eq("public_id", publicId)
    .maybeSingle<InvitationRecord>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
