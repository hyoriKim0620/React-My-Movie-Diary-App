import { CINEMA_ITEMS } from "../constants";

interface getSearchCinemaProps {
  brand: string;
  si: string;
  gu: string;
  cinema_name: string;
}

export const getSearchCinema = (selected: getSearchCinemaProps) => {
  const cinemas = CINEMA_ITEMS.filter(
    (item) =>
      item.brand === selected.brand &&
      item.si === selected.si &&
      item.gu === selected.gu &&
      item.cinema_name.includes(selected.cinema_name)
  );

  return cinemas;
};
