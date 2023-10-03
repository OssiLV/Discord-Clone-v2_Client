import { Channel, Member, Message, Profile, Server, User } from "./type-models";

export type ServerWithChannelsMembers = Server & {
    members: Member[];
    channels: Channel[];
};

export type MemberWithProfileWithUser = Member & {
    profile: Profile & { user: User };
};

export type MessageWithMember = Message & {
    member: Member;
};

export type ServerWithChannels = Server & {
    channels: Channel[];
};

export type MessageWithMemberWithProfileWithUser = Message & {
    member: Member & { profile: Profile & { user: User } };
};
