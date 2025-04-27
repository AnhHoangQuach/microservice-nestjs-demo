import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const OrderSchema = new mongoose.Schema(
  {
    total_amount: { type: String, required: true },
    status: { type: String, default: 'PENDING' },
    shipping_address: { type: String, required: true },
    billing_address: { type: String, required: true },
    payment_status: { type: Number, default: 0 },
    user_id: { type: String, required: true },
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
