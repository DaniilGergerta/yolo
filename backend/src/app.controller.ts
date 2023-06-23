import { Controller, Get, Param } from '@nestjs/common';
import { DATA } from './common/data';

@Controller()
export class AppController {
  @Get()
  getKeys() {
    return Object.keys(DATA);
  }

  @Get('menuitems')
  getMenuItems() {
    return DATA['Menu-Item'];
  }

  @Get('ingredients/:menuItem')
  getIngredients(@Param('menuItem') menuItem: string): string[] {
    return DATA['Ingredient'][menuItem];
  }
}
