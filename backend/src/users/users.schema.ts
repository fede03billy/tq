// schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: false })
	group: string;

	@Prop({ required: true, default: 0 })
	upvotes: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
