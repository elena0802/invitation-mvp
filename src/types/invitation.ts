export type InvitationRecord = {
  id: string;
  public_id: string;
  title: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  venue: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export type CreateInvitationInput = {
  title: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  venue: string;
  message: string;
};
