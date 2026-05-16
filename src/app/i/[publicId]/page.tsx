import { InvitationView } from "@/components/InvitationView";
import { getInvitationByPublicId } from "@/lib/invitations";
import Link from "next/link";

type InvitationPageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function PublicInvitationPage({
  params,
}: InvitationPageProps) {
  const { publicId } = await params;
  const invitation = await getInvitationByPublicId(publicId);

  if (!invitation) {
    return (
      <main className="min-h-screen bg-[#f8f5f0] px-6 py-10 text-[#2f2a25]">
        <section className="mx-auto w-full max-w-md rounded-md bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-[#8a6f55]">
            공개 초대장 URL
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-normal">
            초대장을 찾을 수 없습니다
          </h1>
          <p className="mt-4 leading-7 text-[#6d6258]">
            입력한 공개 URL이 올바른지 확인해주세요.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-[#d8cfc5] px-4 text-sm font-semibold text-[#2f2a25]"
          >
            홈으로
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-h-dvh bg-[#f7efe6] text-[#3f342c]">
      <InvitationView invitation={invitation} />
    </main>
  );
}
