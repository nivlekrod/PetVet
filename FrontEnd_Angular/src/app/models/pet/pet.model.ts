export interface Pet {
    petId?: string; // UUID é representado como string no TypeScript
    name: string;
    species: string; // caso não funcione, subst p/ Species
    breed: string;
    age: number;
    weight: number;
    color: string;
    description: string;
    referenceImage?: string;
    tutor: string;
    emailTutor: string;
}
