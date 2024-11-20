import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styles: []
})
export class SideBarComponent implements OnInit {
  userName?: string = '';
  userPicture?: string = '';
  isOpen = true;
  isConfigMenuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.userName = user?.name;
      this.userPicture = user?.picture;
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.isConfigMenuOpen = false;
    }
  }
 
  toggleConfigMenu() {
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isConfigMenuOpen) {
      const configMenu = document.querySelector('.config-menu');
      const configButton = document.querySelector('.config-button');
      if (!configMenu?.contains(event.target as Node) && !configButton?.contains(event.target as Node)) {
        this.isConfigMenuOpen = false;
      }
    }
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
    this.isConfigMenuOpen = false;
  }
}