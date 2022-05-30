export interface ICreateStudyPayload {
  name: string;
  medicationTested: string;
  startDate: string;
  numberOfParticipans: number;
  flacons: ICreateStudyFlaconItem[];
}

export interface ICreateStudyFlaconItem {
  flaconCode: string;
  isPlacebo: boolean;
}

export interface IStudiesItem {
  id: string;
  name: string;
  medicationTested: string;
  startDate: string;
  numberOfParticipans: number;
  participants: [];
  notes: [];
  feedback: [];
  isActive: true;
}
