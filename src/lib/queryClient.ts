import { QueryClient } from "@tanstack/react-query";

/** Jeden klient na aplikację - współdzielony przez App, hydratację stanu z prerenderu i snapshot. */
export const queryClient = new QueryClient();
