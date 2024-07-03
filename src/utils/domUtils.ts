interface ExtendedDragEvent extends DragEvent {
  dragSrcEl?: HTMLElement;
}

export function clearContainer(container: HTMLDivElement) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}

export const dragAndDropModule = (
  function dragAndDrop() {
    const onDragStart = (e: DragEvent) => {
      const event = e as ExtendedDragEvent;
      const target = event.target as HTMLLIElement;
      event.dragSrcEl = target;
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('application/rankings', target.id);
      }
    }

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    }

    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLLIElement;
      target.classList.add('dragover');
    }

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLLIElement;
      target.classList.remove('dragover');
    }

    const onDragEnd = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLLIElement;
      Array.from(target.parentNode?.children ?? []).forEach(
        (child) => child.classList.remove('dragover')
      )
    }

    const onDrop = (e: DragEvent) => {
      const event = e as ExtendedDragEvent;
      event.preventDefault();
      if (event.dataTransfer) {
        const dropPositionEl = event.target as HTMLLIElement
        const draggedSrcElId = event.dataTransfer.getData('application/rankings');
        const draggedSrcEl = document.getElementById(draggedSrcElId) as HTMLLIElement;
        dropPositionEl.after(draggedSrcEl)
      }
    }

    return {
      onDragStart,
      onDragOver,
      onDragEnter,
      onDragLeave,
      onDragEnd,
      onDrop,
    }
  }()
)
