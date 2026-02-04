import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  
  // indirizzi del backend
  private apiUrl= "http://localhost:8080/api/tickets";

  // costruttore per iniettare HttpClient
  constructor(private http: HttpClient){}  

  // metodo per lista ticket
  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.apiUrl);
  }
}
