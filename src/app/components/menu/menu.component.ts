import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() position: string;
  @Input() icon: string;

  constructor(
    public menu: MenuController,
  ) { }

  ngOnInit() { }

  closeCartMenu(menuId: any) {
    this.menu.toggle(menuId);
  }
}
