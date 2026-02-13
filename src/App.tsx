import { useState, useCallback, useEffect, useRef } from 'react';
import { useFormStore } from '@/hooks/useFormStore';
import type { FormStep } from '@/types';
import { downloadPDF } from '@/lib/pdfGenerator';

// Components
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SiteFooter } from '@/components/Footer';
import { SampleDeedModal } from '@/components/SampleDeedModal';
import { FAQModal } from '@/components/FAQModal';

// Sections
import { HeroSection } from '@/sections/HeroSection';
import { SellerNameSection } from '@/sections/SellerNameSection';
import { SellerCIDSection } from '@/sections/SellerCIDSection';
import { SellerLocationSection } from '@/sections/SellerLocationSection';
import { BuyerNameSection } from '@/sections/BuyerNameSection';
import { BuyerCIDSection } from '@/sections/BuyerCIDSection';
import { BuyerLocationSection } from '@/sections/BuyerLocationSection';
import { VehicleDetailsSection } from '@/sections/VehicleDetailsSection';
import { SalePriceSection } from '@/sections/SalePriceSection';
import { WitnessSection } from '@/sections/WitnessSection';
import { ReviewSection } from '@/sections/ReviewSection';
import { SuccessSection } from '@/sections/SuccessSection';

const STEP_ORDER: FormStep[] = [
  'hero',
  'seller-name',
  'seller-cid',
  'seller-location',
  'buyer-name',
  'buyer-cid',
  'buyer-location',
  'vehicle-details',
  'sale-price',
  'witness',
  'review',
  'success',
];

function AppContent() {
  const {
    formData,
    updateSeller,
    updateBuyer,
    updateVehicle,
    updateWitness,
    updateSale,
    saveDraft,
    resetForm,
  } = useFormStore();

  const [currentStep, setCurrentStep] = useState<FormStep>('hero');
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);

  // Navigation handlers
  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
    
    // Scroll to the section
    const sectionId = `section-${step}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const goToNextStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1];
      goToStep(nextStep);
    }
  }, [currentStep, goToStep]);

  const goToPrevStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STEP_ORDER[currentIndex - 1];
      goToStep(prevStep);
    }
  }, [currentStep, goToStep]);

  // Action handlers
  const handleSaveDraft = useCallback(() => {
    saveDraft();
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2000);
  }, [saveDraft]);

  const handleDownload = useCallback(() => {
    downloadPDF(formData);
  }, [formData]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleStartNew = useCallback(() => {
    resetForm();
    goToStep('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [resetForm, goToStep]);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(`Vehicle Sale Deed - ${formData.vehicle.registrationNumber || 'Document'}`);
    const body = encodeURIComponent('Please find the Vehicle Sale Deed attached.');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [formData]);

  // Update current step based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const step of STEP_ORDER) {
        const element = document.getElementById(`section-${step}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (currentStep !== step) {
              setCurrentStep(step);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  return (
    <div className="relative" ref={mainRef}>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <Header 
        onSaveDraft={handleSaveDraft}
        onHelp={() => setShowFAQModal(true)}
        showSave={currentStep !== 'success'}
      />

      {/* Save Toast */}
      {showSaveToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[400] bg-[#111216] dark:bg-white text-white dark:text-[#111216] px-6 py-3 rounded-full shadow-lg animate-fade-in-up">
          Draft saved successfully
        </div>
      )}

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <div id="section-hero">
          <HeroSection 
            onStart={() => goToStep('seller-name')}
            onViewSample={() => setShowSampleModal(true)}
          />
        </div>

        {/* Seller Name */}
        <div id="section-seller-name">
          <SellerNameSection
            value={{ title: formData.seller.title, fullName: formData.seller.fullName }}
            onChange={(field, value) => updateSeller(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Seller CID */}
        <div id="section-seller-cid">
          <SellerCIDSection
            value={formData.seller.cidNumber}
            onChange={(value) => updateSeller('cidNumber', value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Seller Location */}
        <div id="section-seller-location">
          <SellerLocationSection
            value={{ gewog: formData.seller.gewog, dzongkhag: formData.seller.dzongkhag }}
            onChange={(field, value) => updateSeller(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Buyer Name */}
        <div id="section-buyer-name">
          <BuyerNameSection
            value={{ title: formData.buyer.title, fullName: formData.buyer.fullName }}
            onChange={(field, value) => updateBuyer(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Buyer CID */}
        <div id="section-buyer-cid">
          <BuyerCIDSection
            value={formData.buyer.cidNumber}
            onChange={(value) => updateBuyer('cidNumber', value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Buyer Location */}
        <div id="section-buyer-location">
          <BuyerLocationSection
            value={{ gewog: formData.buyer.gewog, dzongkhag: formData.buyer.dzongkhag }}
            onChange={(field, value) => updateBuyer(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Vehicle Details */}
        <div id="section-vehicle-details">
          <VehicleDetailsSection
            value={formData.vehicle}
            onChange={(field, value) => updateVehicle(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Sale Price */}
        <div id="section-sale-price">
          <SalePriceSection
            value={formData.sale}
            onChange={(field, value) => updateSale(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Witness */}
        <div id="section-witness">
          <WitnessSection
            value={formData.witness}
            onChange={(field, value) => updateWitness(field, value)}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        </div>

        {/* Review */}
        <div id="section-review">
          <ReviewSection
            data={formData}
            onDownload={handleDownload}
            onPrint={handlePrint}
            onEdit={() => goToStep('seller-name')}
          />
        </div>

        {/* Success */}
        <div id="section-success">
          <SuccessSection
            onDownload={handleDownload}
            onStartNew={handleStartNew}
            onEmail={handleEmail}
            onFAQ={() => setShowFAQModal(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Modals */}
      <SampleDeedModal 
        isOpen={showSampleModal} 
        onClose={() => setShowSampleModal(false)} 
      />
      
      <FAQModal 
        isOpen={showFAQModal} 
        onClose={() => setShowFAQModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
