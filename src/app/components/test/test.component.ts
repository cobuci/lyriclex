import { Component, OnInit } from '@angular/core';
import { GeniusService } from '../../services/genius.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent implements OnInit {

  title: string = "Teste de Componente"


  constructor(private service: GeniusService) {

  }

  ngOnInit(): void {
    this.service.getTest().subscribe({
      next: (data)=>{
        console.log(data)
      }
    });
  }

}
