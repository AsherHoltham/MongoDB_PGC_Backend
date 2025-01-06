import { ObjectId } from 'mongodb';

export interface TripCalendarInfo {
    user: ObjectId;
    title: string;
    timeline: string; // 'yyyy-mm-dd: yyyy-mm-dd' format
}

export interface TripMemberInfo {
    user: ObjectId; 
    location: string; // user's departure location
    timeline: string; // 'yyyy-mm-dd: yyyy-mm-dd' format
}

export interface Trip {
    code: string; // 5 characters
    title: string;
    location: string; 
    timeline: string; // 'yyyy-mm-dd: yyyy-mm-dd' format
    checklist: string[];
    calendarInfo: { [memberId: string]: TripCalendarInfo[]; };
    memberInfo: { [memberId: string]: TripMemberInfo; };
    members: ObjectId[];
}