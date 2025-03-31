import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet/pet.model';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private apiUrl = `http://localhost:8080/api/pets`;

    constructor(private client: HttpClient) { }

    getAllPets(): Observable<Pet[]> {
        return this.client.get<Pet[]>(`${this.apiUrl}`);
    }

    getPetById(id: string): Observable<Pet> {
        return this.client.get<Pet>(`${this.apiUrl}/${id}`);
    }

    createPet(pet: Pet): Observable<Pet> {
        return this.client.post<Pet>(this.apiUrl, pet);
    }

    updatePet(id: string, pet: Pet): Observable<Pet> {
        return this.client.put<Pet>(`${this.apiUrl}/${id}`, pet);
    }

    deletePet(id: string): Observable<string> {
        return this.client.delete(`${this.apiUrl}/${id}`, {
            responseType: 'text' as const
        });
    }
}
