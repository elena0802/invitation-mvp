"use client";

import { useState } from "react";
import type { InvitationCardType } from "@/types/invitation";

const KAKAO_SDK_SRC =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
const SHARE_TITLE = "함께해주신 마음에 감사드립니다";
const SHARE_DESCRIPTION = "소중한 분들께 감사 인사를 전합니다.";
const SHARE_ORIGINS: Record<InvitationCardType, string> = {
  invitation: "https://invite.flowlybloom.com",
  thank_you: "https://thanks.flowlybloom.com",
};

type KakaoShareButtonProps = {
  cardType: InvitationCardType;
  publicId: string;
  imageUrl?: string | null;
};

type KakaoLink = {
  mobileWebUrl: string;
  webUrl: string;
};

type KakaoSharePayload =
  | {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: KakaoLink;
      };
      buttons: Array<{
        title: string;
        link: KakaoLink;
      }>;
    }
  | {
      objectType: "text";
      text: string;
      link: KakaoLink;
      buttonTitle: string;
    };

type KakaoSdk = {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share?: {
    sendDefault: (payload: KakaoSharePayload) => Promise<unknown> | void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

let kakaoSdkPromise: Promise<KakaoSdk> | null = null;

export function createPublicCardUrl(
  cardType: InvitationCardType,
  publicId: string,
) {
  return `${SHARE_ORIGINS[cardType]}/i/${encodeURIComponent(publicId)}`;
}

function loadKakaoSdk() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window is not available"));
  }

  if (window.Kakao) {
    return Promise.resolve(window.Kakao);
  }

  if (!kakaoSdkPromise) {
    kakaoSdkPromise = new Promise<KakaoSdk>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${KAKAO_SDK_SRC}"]`,
      );

      const resolveSdk = () => {
        if (window.Kakao) {
          resolve(window.Kakao);
          return;
        }

        kakaoSdkPromise = null;
        reject(new Error("Kakao SDK did not initialize"));
      };

      if (existingScript) {
        existingScript.addEventListener("load", resolveSdk, { once: true });
        existingScript.addEventListener(
          "error",
          () => {
            kakaoSdkPromise = null;
            reject(new Error("Kakao SDK failed to load"));
          },
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = KAKAO_SDK_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.addEventListener("load", resolveSdk, { once: true });
      script.addEventListener(
        "error",
        () => {
          kakaoSdkPromise = null;
          reject(new Error("Kakao SDK failed to load"));
        },
        { once: true },
      );
      document.head.appendChild(script);
    });
  }

  return kakaoSdkPromise;
}

function createSharePayload(url: string, imageUrl?: string | null) {
  const link = {
    mobileWebUrl: url,
    webUrl: url,
  };

  if (imageUrl) {
    return {
      objectType: "feed",
      content: {
        title: SHARE_TITLE,
        description: SHARE_DESCRIPTION,
        imageUrl,
        link,
      },
      buttons: [
        {
          title: "감사장 보기",
          link,
        },
      ],
    } satisfies KakaoSharePayload;
  }

  return {
    objectType: "text",
    text: `${SHARE_TITLE}\n${SHARE_DESCRIPTION}`,
    link,
    buttonTitle: "감사장 보기",
  } satisfies KakaoSharePayload;
}

export function KakaoShareButton({
  cardType,
  publicId,
  imageUrl,
}: KakaoShareButtonProps) {
  const [message, setMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    const kakaoJavascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

    if (!kakaoJavascriptKey) {
      setMessage("카카오 공유 설정이 필요합니다");
      return;
    }

    try {
      setIsSharing(true);
      setMessage("");

      const kakao = await loadKakaoSdk();

      if (!kakao.isInitialized()) {
        kakao.init(kakaoJavascriptKey);
      }

      if (!kakao.Share?.sendDefault) {
        throw new Error("Kakao Share is not available");
      }

      const shareUrl = createPublicCardUrl(cardType, publicId);

      await kakao.Share.sendDefault(createSharePayload(shareUrl, imageUrl));
    } catch {
      setMessage("카카오톡 공유를 사용할 수 없습니다");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="min-h-12 w-full rounded-md bg-[#fee500] px-5 text-base font-semibold text-[#191919] transition hover:bg-[#f4da00] focus:outline-none focus:ring-2 focus:ring-[#a17f63] focus:ring-offset-2 focus:ring-offset-[#fffaf6] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSharing ? "공유 준비 중..." : "카카오톡 공유하기"}
      </button>
      {message ? (
        <p className="mt-3 text-center text-sm font-medium text-[#8a6f55]">
          {message}
        </p>
      ) : null}
    </>
  );
}
