export function clearContainer(container: HTMLDivElement) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}
