export interface CvData {
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
  };
  sections: Section[];
}

export interface Section {
  title: string;
  type: string;
  items: SectionItem[];
}

export interface SectionItem {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}
