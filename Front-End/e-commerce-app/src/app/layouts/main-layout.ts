import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alerts } from '../components/shared/alerts/alerts';
import { Navbar } from '../components/shared/navbar/navbar';
import { Footer } from '../components/shared/footer/footer';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, Alerts, Navbar, Footer],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {} 