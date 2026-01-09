export default function SpecificationStep({ productId, onNext }) {
  return (
    <>
      <h3>Specifications</h3>
      <textarea placeholder="Specification details" />
      <br /><br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
