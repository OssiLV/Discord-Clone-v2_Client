import { Channel, Member, Profile, Server, User } from "./type-models";

export type ServerWithChannelsMembers = Server & {
    members: Member[];
    channels: Channel[];
};

export type MemberWithProfileWithUser = Member & {
    profile: Profile & { user: User };
};
