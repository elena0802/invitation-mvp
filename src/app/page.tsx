import Link from "next/link";
import { headers } from "next/headers";

type LandingContent = {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
};

const INVITATION_LANDING: LandingContent = {
  eyebrow: "셀프 모바일초대장 MVP",
  title: "소중한 순간을 가장 아름답게 전하세요",
  description: "모바일 초대장을 쉽고 감성적으로 만들 수 있습니다.",
  buttonText: "초대장 만들기",
};

const THANK_YOU_LANDING: LandingContent = {
  eyebrow: "셀프 모바일감사장 MVP",
  title: "감사의 마음을 따뜻하게 전하세요",
  description: "소중한 분들께 감사 인사를 남겨보세요.",
  buttonText: "감사장 만들기",
};

function getLandingContent(host: string) {
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname.startsWith("thanks.")) {
    return THANK_YOU_LANDING;
  }

  return INVITATION_LANDING;
}

export default async function Home() {
  const host = (await headers()).get("host") ?? "";
  const landing = getLandingContent(host);

  return (
    <main className="min-h-screen bg-[#f8f5f0] px-6 py-12 text-[#2f2a25]">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-medium text-[#8a6f55]">
          {landing.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
          {landing.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#6d6258] sm:text-lg">
          {landing.description}
        </p>
        <Link
          href="/create"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md bg-[#2f2a25] px-6 text-base font-semibold text-white transition hover:bg-[#4a4037] focus:outline-none focus:ring-2 focus:ring-[#8a6f55] focus:ring-offset-2"
        >
          {landing.buttonText}
        </Link>
      </section>
    </main>
  );
}
