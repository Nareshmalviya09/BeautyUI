import { useState } from "react";
import { useSellerContext } from "../context/SellerContext";

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

  // 🔥 GLOBAL SELLER STATE
  const { productId } = useSellerContext();

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CategoryStep onNext={() => setActiveStep(1)} />;

      case 1:
        return <BrandStep onNext={() => setActiveStep(2)} />;

      case 2:
        return (
          <ProductInfoStep
            onNext={() => setActiveStep(3)}
          />
        );

      case 3:
        return <AttributeStep onNext={() => setActiveStep(4)} />;

      case 4:
        return <FeatureStep onNext={() => setActiveStep(5)} />;

      case 5:
        return <SpecificationStep onNext={() => setActiveStep(6)} />;

      case 6:
        return <VariantStep onNext={() => setActiveStep(7)} />;

      case 7:
        return <VariantPricingStep onNext={() => setActiveStep(8)} />;

      case 8:
        return <ImageUploadStep />;

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      {/* LEFT MENU */}
      <div style={{ width: 260, borderRight: "1px solid #ddd" }}>
        <h3 style={{ padding: 16 }}>Create Product</h3>

        {steps.map((s, i) => {
          const enabled = i === 0 || productId;

          return (
            <div
              key={s}
              onClick={() => enabled && setActiveStep(i)}
              style={{
                padding: 12,
                cursor: enabled ? "pointer" : "not-allowed",
                background: activeStep === i ? "#eee" : "",
                opacity: enabled ? 1 : 0.5
              }}
            >
              {i + 1}. {s}
            </div>
          );
        })}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 24 }}>
        {renderStep()}
      </div>
    </div>
  );
}
