import { BloomThankYouTemplate } from "@/components/templates/thank-you/BloomThankYouTemplate";
import { ClassicThankYouTemplate } from "@/components/templates/thank-you/ClassicThankYouTemplate";
import { MinimalThankYouTemplate } from "@/components/templates/thank-you/MinimalThankYouTemplate";
import type {
  InvitationRecord,
  ThankYouTemplateKey,
} from "@/types/invitation";

type ThankYouTemplateRendererProps = {
  invitation: InvitationRecord;
};

const DEFAULT_THANK_YOU_TEMPLATE: ThankYouTemplateKey = "bloom";

function resolveThankYouTemplateKey(
  templateKey?: string | null,
): ThankYouTemplateKey {
  if (
    templateKey === "bloom" ||
    templateKey === "minimal" ||
    templateKey === "classic"
  ) {
    return templateKey;
  }

  return DEFAULT_THANK_YOU_TEMPLATE;
}

export function ThankYouTemplateRenderer({
  invitation,
}: ThankYouTemplateRendererProps) {
  const templateKey = resolveThankYouTemplateKey(invitation.template_key);

  if (templateKey === "minimal") {
    return <MinimalThankYouTemplate invitation={invitation} />;
  }

  if (templateKey === "classic") {
    return <ClassicThankYouTemplate invitation={invitation} />;
  }

  return <BloomThankYouTemplate invitation={invitation} />;
}
