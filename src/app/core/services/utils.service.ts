import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  calcularBlancoONegroSegunColor(color: string) {
    const col: string = color.replace('#', '')
    const r: number = parseInt(col.slice(0, 2), 16)
    const g: number = parseInt(col.slice(2, 4), 16)
    const b: number = parseInt(col.slice(4, 6), 16)
    return ((r + g + b) / 3 < (255 / 2) ? 'text-white' : 'text-gray-800')
  }
}
