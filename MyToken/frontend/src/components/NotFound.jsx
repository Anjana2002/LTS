import { Button } from "@/components/ui/button"; 

export default function NotFound() {
    return (
        // The container uses standard Tailwind for layout (centering, full height)
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
            
            {/* Shadcn/Tailwind Typography */}
            <h1 className="text-7xl font-extrabold text-destructive tracking-tight mb-4 md:text-8xl">
                404
            </h1>
            
            <h2 className="text-3xl font-semibold mb-2 text-primary">
                Page Not Found
            </h2>
            
            <p className="text-lg text-muted-foreground">
                The page you are looking for does not exist.
            </p>
            
            {/* Shadcn UI Button Component */}
            <Button asChild className="mt-8" variant="default" size="lg">
                <a href="/">
                    Go to Homepage
                </a>
            </Button>
            
        </div>
    );
}