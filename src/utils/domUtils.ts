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
      const event = e as ExtendedDragEvent;
      event.preventDefault();
      const target = event.target as HTMLLIElement;
      if (event.dataTransfer) {
        const draggedSrcElId = event.dataTransfer.getData('application/rankings')

        // early return if target and dragged elements are the same
        if (target.id === draggedSrcElId) return

        const isBefore = isTargetElementBeforeDraggedElement(target, document.getElementById(draggedSrcElId)!)
        if (isBefore) {
          target.classList.add('dragover-top');
        } else {
          target.classList.add('dragover-bottom');
        }
      } else {
        // acts as a fallback in the event dataTransfer attribute is falsy
        target.classList.add('dragover-bottom');
      }
    }

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLLIElement;
      target.classList.remove('dragover-top');
      target.classList.remove('dragover-bottom');
    }

    const onDragEnd = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLLIElement;
      Array.from(target.parentNode?.children ?? []).forEach(
        (child) => {
          child.classList.remove('dragover-top')
          child.classList.remove('dragover-bottom')
        }
      )
    }

    const onDrop = (e: DragEvent) => {
      const event = e as ExtendedDragEvent;
      event.preventDefault();
      if (event.dataTransfer) {
        const dropPositionEl = event.target as HTMLLIElement
        const draggedSrcElId = event.dataTransfer.getData('application/rankings');
        const draggedSrcEl = document.getElementById(draggedSrcElId) as HTMLLIElement;
        const isBefore = isTargetElementBeforeDraggedElement(dropPositionEl, draggedSrcEl)
        if (isBefore) {
          dropPositionEl.before(draggedSrcEl)
        } else {
          dropPositionEl.after(draggedSrcEl)
        }
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

function isTargetElementBeforeDraggedElement(targetEl: HTMLElement, draggedEl: HTMLElement) {
  const parentNode = targetEl.parentNode;
  const childrenArray = Array.from(parentNode?.children ?? [])
  const targetElPosition = childrenArray.indexOf(targetEl)
  const draggedElPosition = childrenArray.indexOf(draggedEl)
  return targetElPosition < draggedElPosition
}