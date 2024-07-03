import { bubbleSortChoicesWithUserInput } from "./bubbleSortChoices";
import { Choice, initialState } from "./initialState";
import { clearContainer, dragAndDropModule } from "./domUtils";

export function setupStart(triggerElement: HTMLButtonElement, container: HTMLDivElement) {
  triggerElement.textContent = 'Start ranking';
  triggerElement.addEventListener('click', () => {
    clearContainer(container);
    // pass in a copy of initialState to prevent unwanted mutations
    const results = bubbleSortChoicesWithUserInput([...initialState]);
    displayResults(results, container);
    triggerElement.textContent = 'Rank again';
    const p = document.createElement('p');
    p.textContent = 'Alternatively, tweak your rankings by dragging and dropping the choices as you wish.'
    container.appendChild(p)
  })
}

function displayResults(results: Choice[], container: HTMLDivElement) {
  const ol = document.createElement('ol');
  results.forEach((result, index) => {
    const li = document.createElement('li');
    li.textContent = result.name;
    li.setAttribute('id', `result-${index.toString()}`);
    li.draggable = true;
    li.addEventListener('dragstart', dragAndDropModule.onDragStart)
    li.addEventListener('dragover', dragAndDropModule.onDragOver)
    li.addEventListener('dragenter', dragAndDropModule.onDragEnter)
    li.addEventListener('dragleave', dragAndDropModule.onDragLeave)
    li.addEventListener('dragend', dragAndDropModule.onDragEnd)
    li.addEventListener('drop', dragAndDropModule.onDrop)
    ol.append(li)
  })
  container.append(ol);
}
