export type RootLayoutType = {
    children: React.ReactNode
}

export type Role = 'ADMIN' | 'MENTOR'

export type View = "List" | "Create" | "None"

export type Registration = {
    id: number,
    userId: number,
    courseId: number,
    createdAt: string,
    user?: User,
    course?: Course,
}

export type Participation = {
    id: number,
    userId: number,
    courseId: number,
    joinedAt: string,
    user?: User,
    course?: Course,
}

export type Course = {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    startTime: string,
    registrations?: Registration[],
    participants?: Participation[],
}

export type User = {
    id: number,
    email: string,
    password: string,
    name: string,
    status: 'ACTIVE' | 'INACTIVE',
    role: Role,
    registrations?: Registration[],
    participations?: Participation[],
}
