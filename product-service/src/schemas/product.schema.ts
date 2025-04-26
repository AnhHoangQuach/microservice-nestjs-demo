import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    description: String,
    image: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    create_by_user: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
