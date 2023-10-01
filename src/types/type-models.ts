export enum ChannelType {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
}
export enum MemberRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    GUEST = "GUEST",
}
export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl?: string;
    password: string;
    provider?: string;
};
export type Profile = {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Server = {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    createdAt: string;
    updatedAt: string;
};

export type Member = {
    id: string;
    role: MemberRole;
    profileId: string;
    serverId: string;
    createdAt: string;
    updatedAt: string;
};

export type Channel = {
    id: string;
    name: string;
    type: ChannelType;
    profileId: string;
    serverId: string;
    createdAt: string;
    updatedAt: string;
};

export type Message = {
    id: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    channelId: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Conversation = {
    id: string;
    memberOneId: string;
    memberTwoId: string;
    createdAt: string;
    updatedAt: string;
};

export type DirectMessage = {
    id: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    conversationId: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};
