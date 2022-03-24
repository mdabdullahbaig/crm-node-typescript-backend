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
    next(HttpError.BadRequest(err.message));
  }

  res.status(201).json(lead);
};

export const getLeads: RequestHandler = async (req, res, next) => {
  let leads;

  try {
    leads = (await Lead.find({})) as ILeadDocument[];
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  if (leads.length < 1) {
    return next(HttpError.NotFound());
  }

  res.status(200).json(leads);
};

export const getLeadById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  let existedLead;

  try {
    existedLead = (await Lead.findById(id)) as ILeadDocument;
  } catch (err: any) {
    return next(HttpError.InternalServerError(err.message));
  }

  if (!existedLead) {
    return next(HttpError.NotFound());
  }

  res.status(200).json(existedLead);
};

export const updateLeadById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);

  let existedLead: any;

  try {
    existedLead = (await Lead.findById(id)) as ILeadDocument;
  } catch (err: any) {
    next(HttpError.InternalServerError(err.message));
  }

  if (!existedLead) {
    return next(HttpError.NotFound());
  }

  updates.forEach((update) => (existedLead[update] = req.body[update]));

  try {
    await existedLead.save();
  } catch (err: any) {
    next(HttpError.BadRequest(err.message));
  }

  res.status(200).json(existedLead);
};

export const deleteLeadById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  let existedLead;

  try {
    existedLead = (await Lead.findById(id)) as ILeadDocument;
  } catch (err: any) {
    next(HttpError.InternalServerError(err.message));
  }

  if (!existedLead) {
    return next(HttpError.NotFound());
  }

  try {
    await existedLead.remove();
  } catch (err: any) {
    next(HttpError.BadRequest(err.message));
  }

  res.status(200).json({ message: "Lead successfully deleted." });
};

// export const getLeads: RequestHandler = async (req, res, next) => {};
