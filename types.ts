
export interface ValentineState {
  isAccepted: boolean;
  message: string;
  imageUrl: string;
  recipientName: string;
  isGenerating: boolean;
}

export enum GenerationType {
  LETTER = 'LETTER',
  IMAGE = 'IMAGE'
}
