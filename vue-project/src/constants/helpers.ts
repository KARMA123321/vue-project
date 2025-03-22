export function getPropertyValue(element: HTMLElement, property: string): string {
  const style = getComputedStyle(element);

  return style.getPropertyValue(property);
}

export function getRemValue(): number {
  const rem = Number(getPropertyValue(document.documentElement, "font-size").match(/\d+/));

  return rem;
}
