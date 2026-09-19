import { DevelopmentAnchorHarness } from "@/components/dev/DevelopmentAnchorHarness";
import { ExperiencesSection } from "@/components/experiences/ExperiencesSection";
import { MobileContactBar } from "@/components/contact/MobileContactBar";
import { PrivatePreview } from "@/components/contact/PrivatePreview";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { Hero } from "@/components/hero/Hero";
import { INTRO_SESSION_KEY } from "@/components/intro/intro.constants";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { HeaderSurfaceObserver } from "@/components/navigation/HeaderSurfaceObserver";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ResidenceCollection } from "@/components/residences/ResidenceCollection";
import { Manifesto } from "@/components/sections/Manifesto";
import { ProjectOverview } from "@/components/sections/ProjectOverview";
import { RareAddress } from "@/components/sections/RareAddress";
import { RareCreators } from "@/components/sections/RareCreators";
import { Wellness } from "@/components/sections/Wellness";
import { StructuredData } from "@/components/seo/StructuredData";

// This executes directly after the server-rendered overlay, before the first paint.
const introSessionBootstrap = `try {
  var replay = ${process.env.NODE_ENV === "development"} && ["1", "debug"].includes(new URLSearchParams(location.search).get("intro"));
  if (!replay && sessionStorage.getItem(${JSON.stringify(INTRO_SESSION_KEY)}) === "1") {
    document.documentElement.dataset.introSeen = "1";
  }
} catch {}`;

export default function Home() {
  return (
    <>
      <StructuredData />
      <IntroLoader />
      <script
        id="intro-session-bootstrap"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: introSessionBootstrap }}
      />
      <div data-intro-site>
        <SiteHeader variant="overlay" />
        <HeaderSurfaceObserver heroId="hero" />
        <main>
          <Hero />
          <Manifesto />
          <ProjectOverview />
          <RareAddress />
          <RareCreators />
          <ExperiencesSection />
          <Wellness />
          <ResidenceCollection />
          <ProjectGallery />
          <PrivatePreview />
        </main>
        <SiteFooter />
        <MobileContactBar />
        {process.env.NODE_ENV === "development" ? (
          <DevelopmentAnchorHarness />
        ) : null}
      </div>
    </>
  );
}
