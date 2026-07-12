import { Helmet } from "react-helmet-async";

/**
 * Wstawia dane strukturalne JSON-LD (schema.org) do <head> danej podstrony.
 * Przyjmuje pojedynczy obiekt lub tablicę obiektów schema.
 */
const JsonLd = ({ data }: { data: object | object[] }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export default JsonLd;
