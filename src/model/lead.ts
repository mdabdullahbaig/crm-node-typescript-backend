import { Schema, model, Document, Model, Types } from "mongoose";

export interface ILead {
  name: string;
  email: string;
  phone: number;
  company: string;
  walkingDate: Date;
  leadSource: string;
  leadOwner?: Types.ObjectId;
}

export interface ILeadDocument extends ILead, Document {}

export interface ILeadModel extends Model<ILeadDocument> {}

const leadSchema = new Schema<ILeadDocument, ILeadModel>({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  company: String,
  walkingDate: Date,
  leadSource: String,
  leadOwner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Lead = model<ILeadDocument, ILeadModel>("Lead", leadSchema);

export default Lead;
