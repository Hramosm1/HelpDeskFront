import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator
  control: FormControl = new FormControl('')
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  displayedColumns = ['postId', 'id', 'name', 'email', 'body']

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.control.valueChanges.subscribe(ob => this.dataSource.filter = ob)
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewTicketComponent, { disableClose: true, width: '80%' })
  }
}
