import { Component, input } from '@angular/core';
import { Member } from '../../../types/member';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-membe-card',
  imports: [RouterLink, AgePipe],
  templateUrl: './membe-card.html',
  styleUrl: './membe-card.css',
})
export class MembeCard {
  member = input.required<Member>();
}
