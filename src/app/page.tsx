import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] px-6 py-12 text-[#2f2a25]">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-medium text-[#8a6f55]">
          셀프 모바일초대장 MVP
        </p>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
          모바일초대장을 직접 만들고
          <br className="hidden sm:block" /> 공개 URL로 공유하세요
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#6d6258] sm:text-lg">
          첫 단계에서는 로그인 없이 초대장 정보를 입력하고, 저장된 초대장을
          공개 페이지에서 확인하는 흐름만 구현합니다.
        </p>
        <Link
          href="/create"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md bg-[#2f2a25] px-6 text-base font-semibold text-white transition hover:bg-[#4a4037] focus:outline-none focus:ring-2 focus:ring-[#8a6f55] focus:ring-offset-2"
        >
          모바일초대장 만들기
        </Link>
      </section>
    </main>
  );
}
