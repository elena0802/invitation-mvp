import { createSupabaseServerClient } from "@/lib/supabase";

const IMAGE_BUCKET = "invitation-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export class InvitationImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvitationImageValidationError";
  }
}

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension && /^[a-z0-9]+$/.test(extension)) {
    return extension;
  }

  return file.type.split("/").at(1) ?? "jpg";
}

export function normalizeInvitationImage(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new InvitationImageValidationError(
      "이미지는 JPG, PNG, WebP 형식만 업로드할 수 있습니다.",
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new InvitationImageValidationError(
      "이미지는 5MB 이하 파일만 업로드할 수 있습니다.",
    );
  }

  return file;
}

export async function uploadInvitationImage(file: File) {
  const supabase = createSupabaseServerClient();
  const extension = getFileExtension(file);
  const filePath = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}
