import { ObjectId } from "mongoose";

export class EventsEntity {
    constructor(
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        public user: ObjectId,
        public _id?: number) { }
}