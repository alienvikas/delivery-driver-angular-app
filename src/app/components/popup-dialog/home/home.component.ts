import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';

export interface ChipBox {
  name: string;
  path: string;
  iconName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private route: Router) {
  }
  chipBoxs: ChipBox[] = [
    { name: 'Person', path: '/person', iconName: 'person' },
    { name: 'Country', path: '/country', iconName: 'country' },
    { name: 'County', path: '/country', iconName: 'country' },
    { name: 'Role', path: '/role', iconName: 'country' },
    { name: 'Passport', path: '/passport', iconName: 'country' },
  ]

  onSelect(path:string){
    this.dialogRef.close(path);
    //this.route.navigate([path]);
  }
}
