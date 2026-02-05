import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TicketService } from '../../service/ticket';
import { Ticket } from '../../models/ticket.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit{

  tickets = signal<Ticket[]>([]);

  // iniezione del service
  constructor(private ticketService: TicketService){}

  ngOnInit(): void {
      this.loadTickets();
  }

  loadTickets(){
    this.ticketService.getTickets().subscribe(data =>{
      this.tickets.set(data);
    });
  }

  newTicket: Ticket = { 
  title: '', 
  description: '', 
  status: 'OPEN' 
  };

  addTicket() {
    this.ticketService.createTicket(this.newTicket).subscribe({
      next: (savedTicket) => {
        this.loadTickets(); 
        this.newTicket = { title: '', description: '', status: 'OPEN' };
        console.log('Ticket salvato con successo:', savedTicket);
      },
      error: (err) => console.error('Errore durante il salvataggio:', err)
    });
  }

  deleteTicket(id:number){
    if(confirm('Sei sicuro di voler eliminare questo ticket?')){
      this.ticketService.deleteTicket(id).subscribe(()=>{
        this.loadTickets();
      })
    }
  }

  workCompleted(ticket: Ticket){
    ticket.status='CLOSED';
    this.ticketService.updateTicket(ticket.id!, ticket).subscribe(()=>{
      this.loadTickets();
    })
  }



}
