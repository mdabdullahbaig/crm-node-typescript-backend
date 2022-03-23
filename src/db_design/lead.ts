import { Types } from "mongoose";

export interface Lead {
  name: string;
  email: string;
  phone: number;
  company: string;
  walkingDate: Date;
  leadSource: string;
  leadAgent?: Types.ObjectId;

  createLead: (
    name_body: string,
    email_body: string,
    company_body: string,
    phone_body: string,
    walkingDate_body: Date,
    leadSource_body: string,
    leadAgent_currentUser: string
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
