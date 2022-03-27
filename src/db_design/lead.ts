import { Types } from "mongoose";

export interface Lead {
  leadOwner?: Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  company: string;
  walkingDate: Date;
  leadSource: string;
  description: string;
  leadStatus: string; // [contacted, contactInFuture, junkLead]
  // Address
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;

  createLead: (
    leadOwner_currentUser: string,
    name_body: string,
    email_body: string,
    company_body: string,
    phone_body: string,
    walkingDate_body: Date,
    leadSource_body: string
  ) => void;

  getLeads: () => void;

  getLeadById: (id_params: string) => void;

  updateLeadById: (
    name_body: string,
    email_body: string,
    company_body: string,
    phone_body: string,
    walkingDate_body: Date,
    leadSource_body: string,
    id_params: string
  ) => void;

  deleteLeadById: (id_params: string) => void;
}
