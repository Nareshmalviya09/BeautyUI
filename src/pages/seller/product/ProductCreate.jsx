import { useState } from "react";

import CategoryStep from "./steps/CategoryStep";
import BrandStep from "./steps/BrandStep";
import ProductInfoStep from "./steps/ProductInfoStep";
import AttributeStep from "./steps/AttributeStep";
import FeatureStep from "./steps/FeatureStep";
import SpecificationStep from "./steps/SpecificationStep";
import VariantStep from "./steps/VariantStep";
import VariantPricingStep from "./steps/VariantPricingStep";
import ImageUploadStep from "./steps/ImageUploadStep";

const steps = [
  "Category",
  "Brand",
  "Product Info",
  "Attributes",
  "Features",
  "Specifications",
  "Variants",
  "Variant Pricing",
  "Images"
];

export default function ProductCreate() {
  const [activeStep, setActiveStep] = useState(0);
  const [productId, setProductId] = useState(null);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CategoryStep onNext={() => setActiveStep(1)} />;
      case 1:
        return <BrandStep onNext={() => setActiveStep(2)} />;
      case 2:
        return (
          <ProductInfoStep
            productId={productId}
            setProductId={setProductId}
            onNext={() => setActiveStep(3)}
          />
        );
      case 3:
        return <AttributeStep productId={productId} onNext={() => setActiveStep(4)} />;
      case 4:
        return <FeatureStep productId={productId} onNext={() => setActiveStep(5)} />;
      case 5:
        return <SpecificationStep productId={productId} onNext={() => setActiveStep(6)} />;
      case 6:
        return <VariantStep productId={productId} onNext={() => setActiveStep(7)} />;
      case 7:
        return <VariantPricingStep productId={productId} onNext={() => setActiveStep(8)} />;
      case 8:
        return <ImageUploadStep productId={productId} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      {/* LEFT MENU */}
      <div style={{ width: 260, borderRight: "1px solid #ddd" }}>
        <h3 style={{ padding: 16 }}>Create Product</h3>
        {steps.map((s, i) => (
          <div
            key={s}
            onClick={() => (i === 0 || productId) && setActiveStep(i)}
            style={{
              padding: 12,
              cursor: i === 0 || productId ? "pointer" : "not-allowed",
              background: activeStep === i ? "#eee" : ""
            }}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 24 }}>
        {renderStep()}
      </div>
    </div>
  );
}
