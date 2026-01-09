export default function VariantPricingStep({ productId, onNext }) {
  return (
    <>
      <h3>Variant Pricing</h3>
      <input placeholder="Price" />
      <input placeholder="Stock" />
      <br /><br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
