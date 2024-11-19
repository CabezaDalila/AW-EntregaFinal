import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  userName?: string = '';
  userPicture?: string = '';
  isOpen = true;
  constructor(public auth: AuthService) {}
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => { 
      this.userName = user?.name; 
      this.userPicture = user?.picture; 
    });
  }
   
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
} 
