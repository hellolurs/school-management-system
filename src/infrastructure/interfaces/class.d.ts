export interface Class {
    id: number;
    name: string;
    description?: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}


export interface CreateClass {
    name: string;
    description?: string;
}