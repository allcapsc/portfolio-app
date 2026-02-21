import Hero from '@/components/home/hero'
import SocialLinks from '@/components/home/social-links'
import Projects from '@/components/home/projects'
import Navigation from '@/components/home/navigation'

export default function Home() {
  return (
    <div className="text-foreground relative mx-auto min-h-screen w-full max-w-7xl p-8 md:p-16">
      <Navigation />
      
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column - Hero Section */}
        <div className="lg:sticky lg:top-16 space-y-6">
          <Hero />
          <SocialLinks />
        </div>
        
        {/* Right Column - Projects */}
        <div id="projects">
          <Projects />
        </div>
      </div>
    </div>
  )
}