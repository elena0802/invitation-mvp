export type InvitationCardType = "invitation" | "thank_you";
export type ThankYouTemplateKey = "bloom" | "minimal" | "classic";

export type InvitationRecord = {
  id: string;
  public_id: string;
  card_type: InvitationCardType;
  title: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  venue: string;
  message: string;
  image_url: string | null;
  template_key: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateInvitationInput = {
  card_type: InvitationCardType;
  title: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  venue: string;
  message: string;
  image_url?: string | null;
};
