import './style.css';
import { setupStart } from './utils/start.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Rank your favo(u)rite ice cream parlors</h1>
    <button class="start" type="button"></button>
    <div class="ranking">
    </div>
  </div>
`;

setupStart(
  document.querySelector<HTMLButtonElement>('.start')!,
  document.querySelector<HTMLDivElement>('.ranking')!
);
