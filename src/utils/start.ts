import { bubbleSortChoicesWithUserInput } from "./bubbleSortChoices";
import { Choice, initialState } from "./initialState";
import { clearContainer } from "./domUtils";

export function setupStart(triggerElement: HTMLButtonElement, container: HTMLDivElement) {
  triggerElement.textContent = 'Start ranking';
  triggerElement.addEventListener('click', () => {
    clearContainer(container);
    // pass in a copy of initialState to prevent unwanted mutations
    const results = bubbleSortChoicesWithUserInput([...initialState]);
    displayResults(results, container);
    triggerElement.textContent = 'Rank again';
  })
}

function displayResults(results: Choice[], container: HTMLDivElement) {
  const ol = document.createElement('ol');
  ol.innerHTML = `
    ${results.map(result => `<li>${result.name}</li>`).join('')}
  `;
  container.append(ol);
}
