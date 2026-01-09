export default function FeatureStep({ productId, onNext }) {
  return (
    <>
      <h3>Features</h3>
      <textarea placeholder="Feature details" />
      <br /><br />
      <button onClick={onNext}>Save & Continue</button>
    </>
  );
}
