import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
userName?:string ='';
userPicture?:string='';

constructor(public auth: AuthService){
 }
 ngOnInit(): void {
   this.auth.user$.subscribe((user)=> {this.userName=user?.name; this.userPicture=user?.picture});  
 }
 
}

