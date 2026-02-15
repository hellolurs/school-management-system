export interface Student {
    id: number;
    full_name: string;
    identity_number: number;
    address: string;
    date_birth: Date;
    place_of_birth: string;
    gender: string;
    religion: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    class_id?: number | null
}

type CreateStudent = Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>