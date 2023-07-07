export function routeIsActive(pathname: string, item: NavigationItem): boolean {
  return item?.exact
    ? pathname === item?.href
    : item?.href
    ? pathname.indexOf(item.href) === 0
    : false;
}
