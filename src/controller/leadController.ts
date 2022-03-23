import { RequestHandler } from "express";
import Lead, { ILead, ILeadDocument } from "../model/lead";
import HttpError from "../utils/HttpError";

export const createLead: RequestHandler = async (req, res, next) => {
  const { name, email, phone, company, walkingDate, leadSource, leadAgent } =
    req.body as ILead;

  let existedLead;

  try {
    existedLead = (await Lead.findOne({ email })) as ILeadDocument;
  } catch (err: any) {
    next(HttpError.InternalServerError(err.message));
  }

  if (existedLead) {
    return next(new HttpError(200, "Lead already exist."));
  }

  const lead = new Lead({
    name,
    email,
    phone,
    company,
    walkingDate,
    leadSource,
    leadAgent,
  });

  try {
    await lead.save();
  } catch (err: any) {
    next(HttpError.InternalServerError(err.message));
  }

  res.status(201).json(lead);
};

export const getLeads: RequestHandler = async (req, res, next) => {
  let leads;

  try {
    leads = (await Lead.find({})) as ILeadDocument[];

    if (leads.length < 1) {
      return next(new HttpError(200, "As of now there is no lead present."));
    }
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  res.status(200).json(leads);
};

export const getLeadById: RequestHandler = async (req, res, next) => {};

export const updateLeadById: RequestHandler = async (req, res, next) => {};

export const deleteLeadById: RequestHandler = async (req, res, next) => {};

// export const getLeads: RequestHandler = async (req, res, next) => {};
