import Drawing from '@/components/features/drawing'
import Navigation from '@/components/home/navigation'

export default function DrawingPage() {
  return (
    <div className="text-foreground relative mx-auto min-h-screen w-full max-w-7xl p-8 md:p-16">
      <Navigation />
      
      <div className="mt-16 mb-8">
        <h1 className="text-4xl font-bold mb-2">Drawing Board</h1>
        <p className="text-muted-foreground">
          A simple canvas for sketching and doodling. Your work is saved automatically.
        </p>
      </div>
      
      <Drawing />
    </div>
  )
}
