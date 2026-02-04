import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TicketService } from '../../service/ticket';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule],
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

}
